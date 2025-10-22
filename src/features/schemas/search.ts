import { z } from "zod";
import { UsersSchema } from "@/features/schemas/user";

export const UsersSearchSchema = z.object({
  total_count: z.number(),
  incomplete_results: z.boolean(),
  items: UsersSchema,
});
