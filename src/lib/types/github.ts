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
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  // Tipos
  mirror_url: string | null; // Diferente de null = Espelho
  private: boolean; // Falso = Público, Verdadeiro = Privado
  fork: boolean; // Verdadeiro = Fork
  is_template: boolean; // Verdadeiro = Template
  archived: boolean; // Verdadeiro = Arquivado
  disabled: boolean; // Verdadeiro = Desativado
}

export type RepoType =
  | "public"
  | "private"
  | "fork"
  | "template"
  | "archived"
  | "mirror"
  | "disabled";
