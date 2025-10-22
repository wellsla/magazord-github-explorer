import { z } from "zod";
import { UserRepositorySchema } from "@/features/schemas/repo";

export type UserRepository = z.infer<typeof UserRepositorySchema>;

export type RepoType =
  | "public"
  | "private"
  | "fork"
  | "template"
  | "archived"
  | "mirror"
  | "disabled";
