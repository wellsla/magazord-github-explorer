import gitHubAxiosInstance from "@/lib/api/github";
import type {
  GitHubQueryParams,
  GitHubUser,
  GitHubUserSocialAccount,
  GitHubUserRepository,
} from "@/lib/types/github";

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
): Promise<GitHubUserSocialAccount[]> => {
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

export const getUserRepositories = async (
  username: string,
  params: GitHubQueryParams = {}
): Promise<GitHubUserRepository[]> => {
  try {
    const response = await gitHubAxiosInstance.get(`/users/${username}/repos`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar repositórios do usuário:", error);
    throw error;
  }
};

export const getUserRepository = async (
  username: string,
  repoName: string
): Promise<GitHubUserRepository> => {
  try {
    const response = await gitHubAxiosInstance.get(
      `/repos/${username}/${repoName}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar repositório específico do usuário:", error);
    throw error;
  }
};
