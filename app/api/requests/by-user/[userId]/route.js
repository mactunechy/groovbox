import { getRecentSongRequests } from '@utils/dynamodb';

export const GET = async (_, { params }) => {
  //TODO: insure that the session user is the same as the user in the params

  const { userId } = params;

  const response = await getRecentSongRequests(userId);

  return new Response(JSON.stringify(response), { status: 200 });
};
