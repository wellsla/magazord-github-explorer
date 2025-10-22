import { getWithSchema } from "@/features/api/fetcher";
import { UsersSearchSchema } from "@/features/schemas/search";
import type { QueryParams } from "@/lib/types/params";

export const getUsersSearch = async (
  username: string,
  params: QueryParams = {}
) => {
  return getWithSchema(`/search`, UsersSearchSchema, {
    params: {
      q: username,
      ...params,
    },
  });
};
