"use client";

import { useParams, useRouter } from "next/navigation";
import ProfileSideBar from "@/components/profile/ProfileSidebar";
import RepoCard from "@/components/repo/RepoCard";
import FilterBar from "@/components/filters/FilterBar";
import SearchField from "@/components/search/SearchField";
import { useUser } from "@/features/hooks/useUser";
import { Skeleton } from "@/ui/skeleton";
import { Alert, AlertDescription } from "@/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useMemo, useState } from "react";
import { useUiStore } from "@/features/stores/useUiStore";
import { BookOpen, Star } from "lucide-react";

export default function StarredPage() {
  const params = useParams();
  const router = useRouter();
  const username = params.user as string;
  const [repoSearch, setRepoSearch] = useState("");
  const { filters } = useUiStore();

  const { user, socials, repos, starreds, isLoading, isError } =
    useUser(username);

  // Filtrar repositórios starred
  const filteredStarreds = useMemo(() => {
    if (!starreds) return [];

    let filtered = starreds;

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

    return filtered;
  }, [starreds, repoSearch, filters]);

  // Extrair linguagens únicas
  const uniqueLanguages = useMemo(() => {
    if (!starreds) return [];
    const languages = starreds
      .map((repo) => repo.language)
      .filter((lang): lang is string => lang !== null);
    return Array.from(new Set(languages));
  }, [starreds]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Skeleton className="h-64 w-80" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>Error on fetching user data.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar com perfil do usuário */}
        <ProfileSideBar user={user} userSocialAccounts={socials} />

        {/* Conteúdo principal */}
        <div className="flex-1">
          <Tabs defaultValue="starred" className="w-full">
            <TabsList className="mb-6 w-full">
              <TabsTrigger
                value="repositories"
                onClick={() => router.push(`/${username}`)}
              >
                <BookOpen className="w-4 h-4" />
                Repositories ({repos?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="starred">
                <Star className="w-4 h-4" />
                Starred ({starreds?.length || 0})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="starred" className="space-y-4">
              {/* Barra de busca e filtros */}
              <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                <div className="flex-1 w-full md:w-auto">
                  <SearchField
                    value={repoSearch}
                    onChange={setRepoSearch}
                    placeholder="Search starred repositories..."
                  />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
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
              </div>

              {/* Lista de repositórios */}
              <div className="space-y-0">
                {filteredStarreds.length === 0 ? (
                  <Alert className="border-[#E5E7EB]">
                    <AlertDescription className="text-[#989898]">
                      No starred repositories found.
                    </AlertDescription>
                  </Alert>
                ) : (
                  filteredStarreds.map((repo) => (
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
