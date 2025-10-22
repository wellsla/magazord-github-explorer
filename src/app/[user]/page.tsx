"use client";
import {
  getUserData,
  getUserSocialAccounts,
  getUserRepositories,
} from "@/services/github/users";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function User() {
  const params = useParams();

  const [repository, setRepository] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (params.user) {
        try {
          const data = await getUserData(params.user as string);
          console.log(data);
        } catch (error) {
          console.error("Erro buscando dados do usuário:", error);
        }
      }
    };
    fetchUserData();

    const fetchUserSocialAccounts = async () => {
      if (params.user) {
        try {
          const socialAccounts = await getUserSocialAccounts(
            params.user as string
          );
          console.log(socialAccounts);
        } catch (error) {
          console.error("Erro buscando contas sociais do usuário:", error);
        }
      }
    };
    fetchUserSocialAccounts();

    const fetchUserRepositories = async () => {
      if (params.user) {
        try {
          const repositories = await getUserRepositories(
            params.user as string,
            { sort: "updated" }
          );
          console.log(repositories);
        } catch (error) {
          console.error("Erro buscando repositórios do usuário:", error);
        }
      }
    };
    fetchUserRepositories();
  }, [params.user]);

  return (
    <div>
      <input
        type="text"
        value={repository}
        placeholder="Repositório do GitHub"
        onChange={(e) => setRepository(e.target.value)}
      />
      <Link href={`/${params.user}/${repository}`}>
        <button>Procurar</button>
      </Link>
    </div>
  );
}
