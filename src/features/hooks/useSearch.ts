import { useQuery } from "@tanstack/react-query";
import { getUsersSearch } from "@/features/services/search";
import type { QueryParams } from "@/lib/types/params";

const useSearch = (username: string, params: QueryParams = {}) => {
  const query = useQuery({
    queryKey: ["usersSearch", username, params],
    queryFn: () => getUsersSearch(username, params),
    enabled: !!username,
  });

  const { data: searchResults, isLoading, isError } = query;

  return {
    searchResults,
    isLoading,
    isError,
  };
};

export default useSearch;
