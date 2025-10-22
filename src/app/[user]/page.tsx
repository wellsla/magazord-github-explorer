"use client";

import {
  getUserData,
  getUserSocialAccounts,
  getUserRepositories,
} from "@/services/github/user";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useQueries } from "@tanstack/react-query";

export default function User() {
  const params = useParams();

  const [repository, setRepository] = useState("");

  const results = useQueries({
    queries: [
      {
        queryKey: ["userData", params.user],
        queryFn: () => getUserData(params.user as string),
        enabled: !!params.user,
      },
      {
        queryKey: ["userSocialAccounts", params.user],
        queryFn: () => getUserSocialAccounts(params.user as string),
        enabled: !!params.user,
      },
      {
        queryKey: ["userRepositories", params.user],
        queryFn: () =>
          getUserRepositories(params.user as string, { sort: "updated" }),
        enabled: !!params.user,
      },
    ],
  });

  useEffect(() => {
    console.log("User Data:", results[0].data);
    console.log("Social Accounts:", results[1].data);
    console.log("Repositories:", results[2].data);
  }, [results]);

  return (
    <div>
      <input
        type="text"
        value={repository}
        placeholder="Repositório do GitHub"
        onChange={(e) => setRepository(e.target.value)}
      />
      <Link href={`/${params.user}/${repository}`}>
        <Button>Procurar repositório específico</Button>
      </Link>
      <Link href={`/${params.user}/starred`}>
        <Button>Starred</Button>
      </Link>
    </div>
  );
}
