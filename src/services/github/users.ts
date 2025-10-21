import gitHubAxiosInstance from "@/lib/api/github";
import type { GitHubUser, GitHubSocialAccount } from "@/lib/types/github";

export const getUserData = async (username: string): Promise<GitHubUser> => {
  try {
    const response = await gitHubAxiosInstance.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
};

export const getUserSocialAccounts = async (
  username: string
): Promise<GitHubSocialAccount[]> => {
  try {
    const response = await gitHubAxiosInstance.get(
      `/users/${username}/social_accounts`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar contas sociais do usuário:", error);
    throw error;
  }
};
