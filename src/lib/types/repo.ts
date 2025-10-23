import { z } from "zod";
import {
  RepositorySchema,
  RepositoryIssueSchema,
} from "@/features/schemas/repo";

export type Repository = z.infer<typeof RepositorySchema>;

export type RepositoryIssue = z.infer<typeof RepositoryIssueSchema>;
