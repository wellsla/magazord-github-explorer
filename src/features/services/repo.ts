import { getWithSchema } from "@/features/api/fetcher";
import {
  RepositoryIssuesSchema,
  RepositorySchema,
} from "@/features/schemas/repo";

export const getUserRepository = async (username: string, repo: string) => {
  return getWithSchema(
    `/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}`,
    RepositorySchema
  );
};

export const getUserRepositoryIssues = async (
  username: string,
  repo: string
) => {
  return getWithSchema(
    `/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}/issues`,
    RepositoryIssuesSchema
  );
};
