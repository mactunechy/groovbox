import { z } from 'zod';

export const SongRequestSchema = z.object({
  djId: z.string(),
  //TODO: pin this down to a specific type
  song: z.unknown(),
});
