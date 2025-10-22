"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import useUser from "@/features/hooks/useUser";

export default function Repositories() {
  const params = useParams();

  const { repos } = useUser(params.user as string);

  useEffect(() => {
    console.log("Repositories:", repos);
  }, [repos]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-center gap-4">
        Repos
      </div>
      <div className="grid gap-3">
        {repos?.map((repo) => (
          <div key={repo.id} className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold">{repo.name}</h3>
            <p className="text-sm text-gray-600">{repo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
