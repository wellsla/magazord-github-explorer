"use client";

import { getUserRepository } from "@/services/github/user";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function User() {
  const params = useParams();

  const {
    data: repositoryData,
    error: repositoryError,
    isLoading: repositoryLoading,
  } = useQuery({
    queryKey: ["userRepository", params.user, params.repo],
    queryFn: () =>
      getUserRepository(params.user as string, params.repo as string),
    enabled: !!params.user && !!params.repo,
  });

  useEffect(() => {
    console.log("Repository Data:", repositoryData);
  }, [repositoryData]);

  return <div></div>;
}
