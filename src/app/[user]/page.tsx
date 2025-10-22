"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useGitHubUserBundle } from "@/lib/hooks/useGithub";

export default function User() {
  const params = useParams();

  const [repository, setRepository] = useState("");

  const { user, socials, repos } = useGitHubUserBundle(params.user as string);

  useEffect(() => {
    console.log("User Data:", user);
    console.log("Social Accounts:", socials);
    console.log("Repositories:", repos);
  }, [user, socials, repos]);

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
