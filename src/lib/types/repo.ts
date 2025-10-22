import { z } from "zod";
import {
  UserRepositorySchema,
  UserRepositoryIssueSchema,
} from "@/features/schemas/repo";

export type UserRepository = z.infer<typeof UserRepositorySchema>;

export type UserRepositoryIssue = z.infer<typeof UserRepositoryIssueSchema>;

export type RepoType =
  | "public"
  | "private"
  | "fork"
  | "template"
  | "archived"
  | "mirror"
  | "disabled";
