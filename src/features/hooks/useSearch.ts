import { useQuery } from "@tanstack/react-query";
import { getUsersSearch } from "@/features/services/search";
import type { QueryParams } from "@/lib/types/params";

export const useSearchUsers = (username: string, params: QueryParams = {}) => {
  const q = username.trim().toLowerCase();
  const query = useQuery({
    queryKey: ["usersSearch", q, params],
    queryFn: () => getUsersSearch(q, params),
    enabled: q.length > 3,
    staleTime: 1000 * 30, // 30 segundos
  });

  const { data, isLoading, isError, isSuccess } = query;

  return {
    data,
    isLoading,
    isError,
    isSuccess,
  };
};
