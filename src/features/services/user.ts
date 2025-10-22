import { getWithSchema } from "@/features/api/fetcher";

import { UserSchema, UserSocialAccountsSchema } from "@/features/schemas/user";
import { UserRepositoriesSchema } from "@/features/schemas/repo";
import type { QueryParams } from "@/lib/types/params";

export const getUserData = async (username: string) => {
  return getWithSchema(`/users/${encodeURIComponent(username)}`, UserSchema);
};

export const getUserSocialAccounts = async (username: string) => {
  return getWithSchema(
    `/users/${encodeURIComponent(username)}/social_accounts`,
    UserSocialAccountsSchema
  );
};

export const getUserRepositories = async (
  username: string,
  params: QueryParams = {}
) => {
  return getWithSchema(
    `/users/${encodeURIComponent(username)}/repos`,
    UserRepositoriesSchema,
    {
      params: params,
    }
  );
};

export const getUserStarredRepositories = async (username: string) => {
  return getWithSchema(
    `/users/${encodeURIComponent(username)}/starred`,
    UserRepositoriesSchema
  );
};
