"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useGitHubUserBundle } from "@/lib/hooks/useGithub";

export default function User() {
  const params = useParams();

  const { starred } = useGitHubUserBundle(params.user as string);

  useEffect(() => {
    console.log("Starred Repositories Data:", starred);
  }, [starred]);

  return <div></div>;
}
