"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

export default function Home() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const navigate = () => {
    if (!username) return;
    router.push(`/${encodeURIComponent(username)}`);
  };

  const enterNavigate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate();
    }
  };

  return (
    <section className="h-[calc(100vh-56px)] grid place-items-center">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-6">
          Explore repositórios GitHub de usuários facilmente
        </h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Digite o nome de usuário do GitHub"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={enterNavigate}
          />
          <Button disabled={!username} onClick={navigate}>
            Explorar
          </Button>
        </div>
      </div>
    </section>
  );
}
