import { z } from 'zod';

export const SongRequestSchema = z.object({
  songKey: z.string(),
  title: z.string(),
  coverUrl: z.string(),
  djId: z.string(),
});
