"use client";

import Link from "next/link";
import { Repository } from "@/lib/types/repo";
import { Badge } from "@/ui/badge";
import { Star, GitFork } from "lucide-react";

interface Props {
  repo: Repository;
}

const RepoCard = ({ repo }: Props) => {
  return (
    <Link href={`/${repo.owner.login}/${repo.name}`}>
      <div className="p-4 pb-6 border-b border-[#E5E7EB]/30 transition-colors hover:bg-gray-50/30">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-[#262626]">
            {repo.owner.login} /{" "}
            <span className="text-[#0587FF]">{repo.name}</span>
          </h3>
          {repo.language && <Badge variant="secondary">{repo.language}</Badge>}
          {repo.archived && <Badge variant="outline">archived</Badge>}
          {repo.fork && <Badge variant="outline">fork</Badge>}
        </div>
        {repo.description && (
          <p className="mt-1 text-sm text-[#989898] line-clamp-2">
            {repo.description}
          </p>
        )}
        <div className="mt-3 flex items-center gap-6 text-sm text-[#262626]">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            {repo.forks_count}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RepoCard;
