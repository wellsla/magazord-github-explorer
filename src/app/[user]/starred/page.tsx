"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStarredRepos } from "@/lib/hooks/useGithub";

export default function User() {
  const params = useParams();

  const starredRepositories = useUserStarredRepos(params.user as string);

  useEffect(() => {
    console.log("Starred Repositories Data:", starredRepositories);
  }, [starredRepositories]);

  return <div></div>;
}
