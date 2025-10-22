"use client";

import Link from "next/link";
import { Repository } from "@/lib/types/repo";
import { Card } from "@/ui/card";
import { Badge } from "@/ui/badge";

interface Props {
  repo: Repository;
}

const RepoCard = ({ repo }: Props) => {
  return (
    <Link href={`/${repo.owner.login}/${repo.name}`}>
      <Card className="p-4 hover:shadow-md transition">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold">
            {repo.owner.login} /{" "}
            <span className="text-blue-600">{repo.name}</span>
          </h3>
          {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
          {repo.archived && <Badge variant="outline">arquivado</Badge>}
          {repo.fork && <Badge variant="outline">fork</Badge>}
        </div>
        {repo.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {repo.description}
          </p>
        )}
        <div className="mt-3 flex gap-6 text-sm text-slate-600">
          <span>⭐ {repo.stargazers_count}</span>
          <span>🍴 {repo.forks_count}</span>
          <span>🍴 {repo.forks_count}</span>
        </div>
      </Card>
    </Link>
  );
};

export default RepoCard;
