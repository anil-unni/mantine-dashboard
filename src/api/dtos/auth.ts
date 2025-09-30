import { z } from 'zod';
import { dateSchema } from '@/utilities/date';

export const LoginRequestSchema = z.object({
  userName: z.string(),
  password: z.string(),
  remember: z.boolean().optional(),
});

export const LoginResponseSchema = z.object({
  type: z.literal('bearer'),
  token: z.string(),
  expiresAt: dateSchema,
});
