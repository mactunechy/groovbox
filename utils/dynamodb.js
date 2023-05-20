import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? 'af-south-1',
  endpoint: process.env.LOCALSTACK_HOSTNAME
    ? `http://${process.env.LOCALSTACK_HOSTNAME}:4566`
    : undefined,
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local',
  },
});

/**
 * Puts a songRequest into the playlist table
 * @param {SongRequest} songRequest
 * @returns {Promise}
 */
export const putSongRequest = async (songRequest) => {
  const params = {
    TableName: 'groovbox_playlist',
    Item: marshall(songRequest),
  };
  return client.send(new PutItemCommand(params));
};

/**
 * Gets the most recent song requests for a user
 * @param {string} userId
 * @returns {Promise}
 */
export const getRecentSongRequests = async (userId) => {
  const params = {
    TableName: 'groovbox_playlist',
    IndexName: 'requestedBy-index',
    KeyConditionExpression: 'requestedBy = :userId',
    ExpressionAttributeValues: {
      ':userId': { S: userId },
    },
    ScanIndexForward: false,
    Limit: 10,
  };
  const response = await client.send(new QueryCommand(params));
  //Unmarshall the response
  const unmarshalled = response.Items.map((item) => unmarshall(item));
  return unmarshalled;
};

/**
 *
 * @param {Object} params
 * @param {string} params.djId - The id of the DJ user
 * @param {string} params.status - The status of the song request
 * @returns {Promise}
 */
export const getPlaylist = async ({ djId, status }) => {
  const params = {
    TableName: 'groovbox_playlist',
    IndexName: 'composite-djId-status-index', // Composite GSI
    KeyConditionExpression: '#djId = :djId and #status = :status',
    ExpressionAttributeValues: {
      ':djId': { S: djId },
      ':status': { S: status },
    },
    ExpressionAttributeNames: {
      '#status': 'status',
      '#djId': 'djId',
    },
    ScanIndexForward: false,
    Limit: 10,
  };
  const response = await client.send(new QueryCommand(params));
  // Unmarshall the response
  const unmarshalled = response.Items.map((item) => unmarshall(item));
  return unmarshalled;
};

/**
 * @param {Object} params
 * @param {String} params.itemId
 * @param {String} params.newStatus
 * @param {String} params.djId
 * @returns {Promise}
 */
export const updateSongRequestStatus = async ({
  songRequestId,
  newStatus: status,
  djId,
}) => {
  const params = {
    TableName: 'groovbox_playlist',
    Key: {
      id: { S: songRequestId },
    },
    ConditionExpression: '#djId = :djId',
    UpdateExpression: 'SET #status = :status',
    ExpressionAttributeNames: {
      '#status': 'status',
      '#djId': 'djId',
    },
    ExpressionAttributeValues: {
      ':status': { S: status },
      ':djId': { S: djId },
    },
  };

  try {
    const response = await client.send(new UpdateItemCommand(params));
    console.log('Item updated successfully');
    return response;
  } catch (error) {
    console.error('Error updating item:', error);
    if (error.name === 'ConditionalCheckFailedException') {
      throw new Error('You are not the DJ');
    }
    throw error;
  }
};
