import { useQueries } from "@tanstack/react-query";
import {
  getUserRepository,
  getUserRepositoryIssues,
} from "@/features/services/repo";

const useRepo = (username: string, repo: string) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["userRepository", username, repo],
        queryFn: () => getUserRepository(username, repo as string),
        enabled: !!username && !!repo,
      },
      {
        queryKey: ["userRepositoryIssues", username, repo],
        queryFn: () => getUserRepositoryIssues(username, repo as string),
        enabled: !!username && !!repo,
      },
    ],
  });

  const [repoQ, issuesQ] = queries;

  return {
    repo: repoQ.data,
    issues: issuesQ.data,
    isLoading: queries.some((q) => q.isLoading),
    isError: queries.some((q) => q.isError),
    refetchAll: () => {
      queries.forEach((q) => q.refetch());
    },
  };
};

export default useRepo;
