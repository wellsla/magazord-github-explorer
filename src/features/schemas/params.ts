import { z } from "zod";

export const QueryParamsSchema = z.object({
  q: z.string().optional(),
  type: z.enum(["all", "owner", "member"]).optional(),
  sort: z.enum(["created", "updated", "pushed", "full_name"]).optional(),
  direction: z.enum(["asc", "desc"]).optional(),
  per_page: z.number().min(1).max(100).optional(),
  page: z.number().min(1).optional(),
});
