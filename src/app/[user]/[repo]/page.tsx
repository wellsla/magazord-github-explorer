"use client";
import { getUserRepository } from "@/services/github/users";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function User() {
  const params = useParams();

  useEffect(() => {
    const fetchSpecificRepository = async () => {
      if (params.user) {
        try {
          const repository = await getUserRepository(
            params.user as string,
            params.repo as string
          );
          console.log(repository);
        } catch (error) {
          console.error(
            "Erro buscando repositório específico do usuário:",
            error
          );
        }
      }
    };
    fetchSpecificRepository();
  }, [params.user, params.repo]);

  return <div></div>;
}
