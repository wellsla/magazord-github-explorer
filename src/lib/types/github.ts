export interface GitHubQueryParams {
  type?: "all" | "owner" | "member";
  sort?: "created" | "updated" | "pushed" | "full_name";
  direction?: "asc" | "desc";
  per_page?: number;
  page?: number;
}

export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string | null;
  name: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
}

export interface GitHubUserSocialAccount {
  provider: string | "generic";
  url: string;
}

export interface GitHubUserRepository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: number | null;
  forks: number;
}
