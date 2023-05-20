import { updateSongRequestStatus } from '@utils/dynamodb';

export const PATCH = async (request, { params }) => {
  const { id } = params;
  const { status } = await request.json();

  if (!status) {
    return new Response(
      JSON.stringify({
        error: { message: 'Invalid request', errors: 'Status is required' },
      }),
      { status: 400 }
    );
  }

  //Only the DJ can change the status of a song request
  // We assume the DJ is the session user
  //Get the session user and user user id as the DJ id
  const djId = 'TODO';
  try {
    await updateSongRequestStatus({
      songRequestId: id,
      newStatus: status,
      djId,
    });
    return new Response(undefined, { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: { message: 'Invalid request', errors: [error.message] },
      }),
      { status: 400 }
    );
  }
};
