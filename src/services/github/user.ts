import { getWithSchema } from "@/lib/api/fetcher";

import {
  GitHubUserSchema,
  GitHubUserSocialAccountsSchema,
  GitHubUserRepositoriesSchema,
  GitHubUserRepositorySchema,
  type GitHubQueryParams,
} from "@/lib/types/github";

export const getUserData = async (username: string) => {
  return getWithSchema(
    `/users/${encodeURIComponent(username)}`,
    GitHubUserSchema
  );
};

export const getUserSocialAccounts = async (username: string) => {
  return getWithSchema(
    `/users/${encodeURIComponent(username)}/social_accounts`,
    GitHubUserSocialAccountsSchema
  );
};

export const getUserRepositories = async (
  username: string,
  params: GitHubQueryParams = {}
) => {
  return getWithSchema(
    `/users/${encodeURIComponent(username)}/repos`,
    GitHubUserRepositoriesSchema,
    {
      params: params,
    }
  );
};

export const getUserStarredRepositories = async (username: string) => {
  return getWithSchema(
    `/users/${encodeURIComponent(username)}/starred`,
    GitHubUserRepositoriesSchema
  );
};

export const getUserRepository = async (username: string, repoName: string) => {
  return getWithSchema(
    `/repos/${encodeURIComponent(username)}/${encodeURIComponent(repoName)}`,
    GitHubUserRepositorySchema
  );
};
