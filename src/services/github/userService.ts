import gitHubAxiosInstance from "@/lib/api/github";
import type { GitHubUser } from "@/lib/types/github";

export const getUserData = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await gitHubAxiosInstance.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
};
