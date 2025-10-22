"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import useUser from "@/features/hooks/useUser";
import { Input } from "@/ui/input";

export default function User() {
  const params = useParams();
  const router = useRouter();

  const [repository, setRepository] = useState("");
  const { user, socials } = useUser(params.user as string);

  const navigate = (page: string) => {
    if (!page) return;
    router.push(
      `/${encodeURIComponent(params.user as string)}/${encodeURIComponent(
        page
      )}`
    );
  };

  const enterNavigate = (
    e: React.KeyboardEvent<HTMLInputElement>,
    page: string
  ) => {
    if (e.key === "Enter") {
      navigate(page);
    }
  };

  useEffect(() => {
    console.log("User Data:", user);
  }, [user]);

  useEffect(() => {
    console.log("Social Accounts:", socials);
  }, [socials]);

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-8">
        <Input
          type="text"
          value={repository}
          placeholder="Repositório do GitHub"
          onChange={(e) => setRepository(e.target.value)}
          onKeyDown={(e) => enterNavigate(e, repository)}
        />
        <Button onClick={() => navigate(repository)}>
          Procurar repositório específico
        </Button>
        <Button onClick={() => navigate("starred")}>Starred</Button>
      </div>
    </>
  );
}
