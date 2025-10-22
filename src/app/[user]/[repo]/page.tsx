"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import useRepo from "@/features/hooks/useRepo";

export default function Repo() {
  const params = useParams();

  const { repoDetails } = useRepo(params.user as string, params.repo as string);

  useEffect(() => {
    console.log("Repository Data:", repoDetails);
  }, [repoDetails]);

  return <div></div>;
}
