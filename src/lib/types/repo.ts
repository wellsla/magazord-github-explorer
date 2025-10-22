import { z } from "zod";
import {
  RepositorySchema,
  RepositoryIssueSchema,
} from "@/features/schemas/repo";

export type Repository = z.infer<typeof RepositorySchema>;

export type RepositoryIssue = z.infer<typeof RepositoryIssueSchema>;

export type RepoType = "all" | "sources" | "forks" | "archived" | "mirrors";

export type SortBy = "updated" | "created" | "pushed" | "full_name";
