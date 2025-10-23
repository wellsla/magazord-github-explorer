"use client";

import { useParams } from "next/navigation";
import { useRepo } from "@/features/hooks/useRepo";
import { Skeleton } from "@/ui/skeleton";
import { Alert, AlertDescription } from "@/ui/alert";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Star, GitFork, Bug, Code2, Archive } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

export default function RepoPage() {
  const params = useParams();
  const username = params.user as string;
  const repoName = params.repo as string;

  const { repo, issues, isLoading, isError } = useRepo(username, repoName);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full" />
        <div className="mt-8 space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !repo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Error on fetching repository data.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header do repositório */}
      <Card className="p-6 mb-8 border-[#E5E7EB]">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={repo.owner.avatar_url || undefined}
                alt={repo.owner.login || repo.owner.login}
              />
              <AvatarFallback className="text-2xl">
                {repo.owner.login.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-white/10 pointer-events-none" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-[#262626]">
                {repo.owner.login} / {repo.name}
              </h1>
              {repo.private && <Badge>Private</Badge>}
              {repo.archived && (
                <Badge variant="outline">
                  <Archive className="w-3 h-3 mr-1" />
                  Archived
                </Badge>
              )}
              {repo.fork && <Badge variant="secondary">Fork</Badge>}
              {repo.is_template && <Badge variant="secondary">Template</Badge>}
            </div>

            {repo.description && (
              <p className="text-[#989898] mb-4">{repo.description}</p>
            )}

            <div className="flex flex-wrap gap-6 text-sm text-[#262626]">
              {repo.language && (
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#262626]" />
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#262626]" />
                <span>{repo.stargazers_count.toLocaleString()} stars</span>
              </div>
              <div className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-[#262626]" />
                <span>{repo.forks_count.toLocaleString()} forks</span>
              </div>
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4 text-[#262626]" />
                <span>{repo.open_issues_count.toLocaleString()} issues</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Issues do repositório */}
      <section>
        <div className="space-y-3">
          {!issues || issues.length === 0 ? (
            <Alert className="border-[#E5E7EB]">
              <AlertDescription className="text-[#989898]">
                This repository has no open issues.
              </AlertDescription>
            </Alert>
          ) : (
            issues.map((issue) => (
              <a
                key={issue.id}
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="p-4 border-[#E5E7EB] transition-colors hover:bg-gray-50/50 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Bug className="w-5 h-5 text-[#10B981] mt-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#0587FF] hover:underline font-medium">
                        {issue.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-sm text-[#989898]">
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={issue.user.avatar_url || undefined}
                            alt={issue.user.login || issue.user.login}
                          />
                          <AvatarFallback className="text-xs">
                            {issue.user.login.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{issue.user.login}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
