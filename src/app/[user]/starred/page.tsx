"use client";

import { getUserStarredRepositories } from "@/services/github/user";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function User() {
  const params = useParams();

  const {
    data: starredRepositoriesData,
    error: starredRepositoriesError,
    isLoading: starredRepositoriesLoading,
  } = useQuery({
    queryKey: ["userStarredRepositories", params.user],
    queryFn: () => getUserStarredRepositories(params.user as string),
    enabled: !!params.user,
  });

  useEffect(() => {
    console.log("Starred Repositories Data:", starredRepositoriesData);
  }, [starredRepositoriesData]);

  return <div></div>;
}
