"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useGitHubRepoDetails } from "@/lib/hooks/useGithub";

export default function User() {
  const params = useParams();

  const { repoDetails } = useGitHubRepoDetails(
    params.user as string,
    params.repo as string
  );

  useEffect(() => {
    console.log("Repository Data:", repoDetails);
  }, [repoDetails]);

  return <div></div>;
}
