"use client";

import { useParams } from "next/navigation";
import { useUserRepoDetails } from "@/lib/hooks/useGithub";
import { useEffect } from "react";

export default function User() {
  const params = useParams();

  const repository = useUserRepoDetails(
    params.user as string,
    params.repo as string
  );

  useEffect(() => {
    console.log("Repository Data:", repository);
  }, [repository]);

  return <div></div>;
}
