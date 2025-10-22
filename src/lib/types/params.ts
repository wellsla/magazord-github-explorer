import { z } from "zod";
import { QueryParamsSchema } from "@/features/schemas/params";

export type QueryParams = z.infer<typeof QueryParamsSchema>;
