"use client";

import { useParams } from "next/navigation";
import ProfileSideBar from "@/components/profile/ProfileSidebar";
import RepoCard from "@/components/repo/RepoCard";
import FilterBar from "@/components/filters/FilterBar";
import SearchField from "@/components/search/SearchField";
import { useUser } from "@/features/hooks/useUser";
import { Skeleton } from "@/ui/skeleton";
import { Alert, AlertDescription } from "@/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useUiStore } from "@/features/stores/useUiStore";
import type { User } from "@/lib/types/user";

export default function User() {
  const params = useParams();
  const router = useRouter();
  const username = params.user as string;
  const [repoSearch, setRepoSearch] = useState("");
  const { filters } = useUiStore();

  const { user, socials, repos, starreds, isLoading, isError } =
    useUser(username);

  // Filtrar repositórios
  const filteredRepos = useMemo(() => {
    if (!repos) return [];

    let filtered = repos;

    // Filtro por busca de texto
    if (repoSearch) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(repoSearch.toLowerCase()) ||
          repo.description?.toLowerCase().includes(repoSearch.toLowerCase())
      );
    }

    // Filtro por tipo
    if (filters.type !== "all") {
      switch (filters.type) {
        case "public":
          filtered = filtered.filter((repo) => !repo.private);
          break;
        case "private":
          filtered = filtered.filter((repo) => repo.private);
          break;
        case "fork":
          filtered = filtered.filter((repo) => repo.fork);
          break;
        case "archived":
          filtered = filtered.filter((repo) => repo.archived);
          break;
        case "mirror":
          filtered = filtered.filter((repo) => repo.mirror_url !== null);
          break;
        case "template":
          filtered = filtered.filter((repo) => repo.is_template);
          break;
      }
    }

    // Filtro por linguagem
    if (filters.language !== "all" && filters.language !== "All") {
      filtered = filtered.filter((repo) => repo.language === filters.language);
    }

    // Ordenação
    if (filters.sort === "updated") {
      // Já vem ordenado por updated pela API
    } else if (filters.sort === "name") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === "stars") {
      filtered = [...filtered].sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
    }

    return filtered;
  }, [repos, repoSearch, filters]);

  // Extrair linguagens únicas dos repositórios
  const uniqueLanguages = useMemo(() => {
    if (!repos) return [];
    const languages = repos
      .map((repo) => repo.language)
      .filter((lang): lang is string => lang !== null);
    return Array.from(new Set(languages));
  }, [repos]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Skeleton className="h-64 w-80" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Em caso de erro ou usuário ausente, mostre um alerta simples
  if (isError || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert>
          <AlertDescription>
            It was not possible to load the user profile. Please try again
            later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Conteúdo principal quando deu tudo certo
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar com perfil do usuário */}
        <ProfileSideBar user={user} userSocialAccounts={socials} />

        {/* Conteúdo principal */}
        <div className="flex-1">
          <Tabs defaultValue="repositories" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="repositories">
                Repositories ({repos?.length || 0})
              </TabsTrigger>
              <TabsTrigger
                value="starred"
                onClick={() => router.push(`/${username}/starred`)}
              >
                Starred ({starreds?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="repositories" className="space-y-4">
              {/* Barra de busca */}
              <SearchField
                value={repoSearch}
                onChange={setRepoSearch}
                placeholder="Buscar repositórios..."
              />

              {/* Filtros */}
              <div className="flex gap-3">
                <FilterBar
                  variant="type"
                  options={[
                    "public",
                    "private",
                    "fork",
                    "archived",
                    "mirror",
                    "template",
                  ]}
                />
                <FilterBar variant="language" options={uniqueLanguages} />
              </div>

              {/* Lista de repositórios */}
              <div className="space-y-3">
                {filteredRepos.length === 0 ? (
                  <Alert>
                    <AlertDescription>
                      No repositories found matching your criteria.
                    </AlertDescription>
                  </Alert>
                ) : (
                  filteredRepos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
