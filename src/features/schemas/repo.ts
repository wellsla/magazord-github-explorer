import { z } from "zod";
import { UserSchema } from "@/features/schemas/user";

export const UserRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  owner: UserSchema,
  // Tipos
  mirror_url: z.url().nullable(), // Diferente de null = Espelho
  private: z.boolean(), // Falso = Público, Verdadeiro = Privado
  fork: z.boolean(), // Verdadeiro = Fork
  is_template: z.boolean(), // Verdadeiro = Template
  archived: z.boolean(), // Verdadeiro = Arquivado
  disabled: z.boolean(), // Verdadeiro = Desativado
});
export const UserRepositoriesSchema = z.array(UserRepositorySchema);
