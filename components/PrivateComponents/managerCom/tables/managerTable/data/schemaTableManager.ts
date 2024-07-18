import { z } from "zod";

export const tableManagerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  gender: z.string(),
  createdAt: z.date(),
  RefershCom: z.boolean().optional(),
});

export type TableManager = z.infer<typeof tableManagerSchema>;
