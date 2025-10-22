import { useQuery } from "@tanstack/react-query";
import {
  getUserData,
  getUserRepository,
  getUserSocialAccounts,
  getUserStarredRepositories,
} from "@/services/github/user";

export const useUser = (user?: string) => {
  return useQuery({
    queryKey: ["userData", user],
    queryFn: () => getUserData(user as string),
    enabled: !!user,
  });
};

export const useUserSocialAccounts = (user?: string) => {
  return useQuery({
    queryKey: ["userSocialAccounts", user],
    queryFn: () => getUserSocialAccounts(user as string),
    enabled: !!user,
  });
};

export const useUserRepos = (user?: string, repo?: string) => {
  return useQuery({
    queryKey: ["userRepository", user, repo],
    queryFn: () => getUserRepository(user as string, repo as string),
    enabled: !!user && !!repo,
  });
};

export const useUserStarredRepos = (user?: string) => {
  return useQuery({
    queryKey: ["userStarredRepositories", user],
    queryFn: () => getUserStarredRepositories(user as string),
    enabled: !!user,
  });
};

export const useUserRepoDetails = (user?: string, repo?: string) => {
  return useQuery({
    queryKey: ["userRepositoryDetails", user, repo],
    queryFn: () => getUserRepository(user as string, repo as string),
    enabled: !!user && !!repo,
  });
};
