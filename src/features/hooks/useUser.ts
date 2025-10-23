import { useQueries } from "@tanstack/react-query";
import {
  getUserData,
  getUserSocialAccounts,
  getUserRepositories,
  getUserStarredRepositories,
} from "@/features/services/user";
import type { QueryParams } from "@/lib/types/params";
import type { User, UserSocialAccount } from "@/lib/types/user";
import type { Repository } from "@/lib/types/repo";

export const useUser = (username: string, params: QueryParams = {}) => {
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
        queryFn: () => getUserRepositories(username, params),
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
    user: userQ.data as User,
    socials: socialsQ.data as UserSocialAccount[],
    repos: reposQ.data as Repository[],
    starreds: starredQ.data as Repository[],
    isLoading: queries.some((q) => q.isLoading),
    isError: queries.some((q) => q.isError),
    refetchAll: () => {
      queries.forEach((q) => q.refetch());
    },
  };
};
