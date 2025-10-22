import { useQuery } from "@tanstack/react-query";
import { getUserRepository } from "@/features/services/repo";

const useRepo = (username: string, repo?: string) => {
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

export default useRepo;
