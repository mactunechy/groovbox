import { putSongRequest } from '@utils/dynamodb';
import { SONG_REQUEST_PRIORITY, SONG_STATUS } from '@utils/enums';
import { SongRequestSchema } from '@utils/schema';
import { v4 as uuid } from 'uuid';

export const POST = async (req) => {
  const body = await req.json();
  let priority = new URL(req.url).searchParams.get('priority')?.toUpperCase();

  //Validate body against schem?.toUpperCas()
  const validate = SongRequestSchema.safeParse(body);

  if (!validate.success) {
    const { errors } = validate.error;

    return new Response(
      JSON.stringify({
        error: { message: 'Invalid request', errors },
      }),
      { status: 400 }
    );
  }

  //TODO: Create a transaction if insufficent credit, throw error
  //Charge based on prioritaization
  //Charge based on song duration (maybe)
  //Charge based on genre (maybe)

  const songRequest = {
    ...validate.data,
    createdAt: new Date().toISOString(),
    transactionId: 'TODO', //TODO
    id: uuid(),
    status: SONG_STATUS.PENDING,
    priority: SONG_REQUEST_PRIORITY[priority] || SONG_REQUEST_PRIORITY.STANDARD,
    requestedBy: '1', //TODO: should come from session
  };

  await putSongRequest(songRequest);

  return new Response(undefined, { status: 201 });
};
