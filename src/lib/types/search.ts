import { z } from "zod";
import { UsersSearchSchema } from "@/features/schemas/search";

export type UsersSearch = z.infer<typeof UsersSearchSchema>;
