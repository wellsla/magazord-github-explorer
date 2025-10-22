import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getUserData,
  getUserSocialAccounts,
  getUserRepositories,
  getUserStarredRepositories,
  getUserRepository,
} from "@/services/github/user";

export const useGitHubUserBundle = (username: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["user", username],
        queryFn: () => getUserData(username),
        enabled: !!username,
      },
      {
        queryKey: ["userSocialAccounts", username],
        queryFn: () => getUserSocialAccounts(username),
        enabled: !!username,
      },
      {
        queryKey: ["userRepositories", username],
        queryFn: () => getUserRepositories(username),
        enabled: !!username,
      },
      {
        queryKey: ["userStarredRepositories", username],
        queryFn: () => getUserStarredRepositories(username),
        enabled: !!username,
      },
    ],
  });

  const [userQ, socialsQ, reposQ, starredQ] = queries;

  return {
    user: userQ.data,
    socials: socialsQ.data,
    repos: reposQ.data,
    starred: starredQ.data,
    isLoading: queries.some((q) => q.isLoading),
    isError: queries.some((q) => q.isError),
    refetchAll: () => {
      queries.forEach((q) => q.refetch());
    },
  };
};

export const useGitHubRepoDetails = (username: string, repo?: string) => {
  const query = useQuery({
    queryKey: ["userRepository", username, repo],
    queryFn: () => getUserRepository(username, repo as string),
    enabled: !!username && !!repo,
  });

  const { data: repoDetails, isLoading, isError } = query;

  return {
    repoDetails,
    isLoading,
    isError,
  };
};
