import { getPlaylist } from '@utils/dynamodb';
import { SONG_STATUS } from '@utils/enums';

export const GET = async (_, { params }) => {
  const { djId } = params;

  const response = await getPlaylist({ djId, status: SONG_STATUS.PENDING });

  return new Response(JSON.stringify(response), { status: 200 });
};
