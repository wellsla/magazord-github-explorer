import { z } from "zod";
import { OwnerSchema } from "@/features/schemas/user";

export const RepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  owner: OwnerSchema,
  // Tipos
  mirror_url: z.url().nullable().optional(), // Diferente de null = Espelho
  private: z.boolean(), // Falso = Público, Verdadeiro = Privado
  fork: z.boolean(), // Verdadeiro = Fork
  is_template: z.boolean(), // Verdadeiro = Template
  archived: z.boolean(), // Verdadeiro = Arquivado
  disabled: z.boolean().optional(), // Verdadeiro = Desativado
});
export const RepositoriesSchema = z.array(RepositorySchema);

export const RepositoryIssueSchema = z.object({
  id: z.number(),
  url: z.url(),
  title: z.string(),
  user: OwnerSchema,
});
export const RepositoryIssuesSchema = z.array(RepositoryIssueSchema);
