import { getWithSchema } from "@/features/api/fetcher";
import { UserRepositorySchema } from "@/features/schemas/repo";

export const getUserRepository = async (username: string, repo: string) => {
  return getWithSchema(
    `/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo)}`,
    UserRepositorySchema
  );
};
