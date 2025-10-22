"use client";
import { getUserStarredRepositories } from "@/services/github/user";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function User() {
  const params = useParams();

  useEffect(() => {
    const fetchStarredRepositories = async () => {
      if (params.user) {
        try {
          const repositories = await getUserStarredRepositories(
            params.user as string
          );
          console.log(repositories);
        } catch (error) {
          console.error(
            "Erro buscando repositórios favoritos do usuário:",
            error
          );
        }
      }
    };
    fetchStarredRepositories();
  }, [params.user]);

  return <div></div>;
}
