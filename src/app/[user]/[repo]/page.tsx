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
      <Card className="p-6 mb-8">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={repo.owner.avatar_url || undefined}
              alt={repo.owner.login || repo.owner.login}
            />
            <AvatarFallback>
              {repo.owner.login.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">
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
              <p className="text-muted-foreground mb-4">{repo.description}</p>
            )}

            <div className="flex flex-wrap gap-6 text-sm">
              {repo.language && (
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>{repo.stargazers_count.toLocaleString()} stars</span>
              </div>
              <div className="flex items-center gap-2">
                <GitFork className="w-4 h-4" />
                <span>{repo.forks_count.toLocaleString()} forks</span>
              </div>
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4" />
                <span>{repo.open_issues_count.toLocaleString()} issues</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Issues do repositório */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Issues ({issues?.length || 0})
        </h2>

        <div className="space-y-3">
          {!issues || issues.length === 0 ? (
            <Alert>
              <AlertDescription>
                This repository has no open issues.
              </AlertDescription>
            </Alert>
          ) : (
            issues.map((issue) => (
              <Card key={issue.id} className="p-4 hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <Bug className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <a
                      href={issue.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {issue.title}
                    </a>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Avatar className="h-5 w-5">
                        <AvatarImage
                          src={issue.user.avatar_url || undefined}
                          alt={issue.user.login || issue.user.login}
                        />
                        <AvatarFallback>
                          {issue.user.login.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{issue.user.login}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
