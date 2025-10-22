import { z } from "zod";

export const GitHubQueryParamsSchema = z.object({
  type: z.enum(["all", "owner", "member"]).optional(),
  sort: z.enum(["created", "updated", "pushed", "full_name"]).optional(),
  direction: z.enum(["asc", "desc"]).optional(),
  per_page: z.number().min(1).max(100).optional(),
  page: z.number().min(1).optional(),
});

export type GitHubQueryParams = z.infer<typeof GitHubQueryParamsSchema>;

export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.url().nullable(),
  name: z.string(),
  bio: z.string().nullable(),
  company: z.string().nullable(),
  location: z.string().nullable(),
  blog: z.url().nullable(),
});

export type GitHubUser = z.infer<typeof GitHubUserSchema>;

export const GitHubUserSocialAccountSchema = z.object({
  provider: z.string(),
  url: z.url(),
});
export const GitHubUserSocialAccountsSchema = z.array(
  GitHubUserSocialAccountSchema
);

export type GitHubUserSocialAccount = z.infer<
  typeof GitHubUserSocialAccountSchema
>;

export const GitHubUserRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  // Tipos
  mirror_url: z.url().nullable(), // Diferente de null = Espelho
  private: z.boolean(), // Falso = Público, Verdadeiro = Privado
  fork: z.boolean(), // Verdadeiro = Fork
  is_template: z.boolean(), // Verdadeiro = Template
  archived: z.boolean(), // Verdadeiro = Arquivado
  disabled: z.boolean(), // Verdadeiro = Desativado
});
export const GitHubUserRepositoriesSchema = z.array(GitHubUserRepositorySchema);

export type GitHubUserRepository = z.infer<typeof GitHubUserRepositorySchema>;

export type RepoType =
  | "public"
  | "private"
  | "fork"
  | "template"
  | "archived"
  | "mirror"
  | "disabled";
