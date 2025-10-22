"use client";

import { useEffect, useState } from "react";
import { useSearchUsers } from "@/features/hooks/useSearch";
import { Input } from "@/ui/input";
import { useRouter } from "next/navigation";
import { Card } from "@/ui/card";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

const UserSearchBar = () => {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();
  const { searchResults: data } = useSearchUsers(q);

  useEffect(() => {
    const id = setTimeout(() => {
      setQ((v) => v);
    }, 250);
    return () => clearTimeout(id);
  }, [q]);

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selected) {
      router.push(`/${selected}`);
    }
  };

  const handleClick = () => {
    if (selected) {
      router.push(`/${selected}`);
    }
  };

  return (
    <div className="w-full max-w-2xl space-y-3">
      <div className="relative">
        <Input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pesquise usuários GitHub (digite para receber sugestões)"
          onKeyDown={handleEnterKey}
        />
        {!!data?.items.length && q.trim() && (
          <Card className="absolute z-10 mt-2 w-full p-2">
            <ul className="max-h-72 overflow-auto">
              {data.items.map((user) => (
                <li
                  key={user.id}
                  className={`flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-muted ${
                    selected === user.login ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelected(user.login)}
                >
                  <Avatar>
                    <AvatarImage
                      src={user.avatar_url || undefined}
                      alt={user.name || "User Avatar"}
                    />
                    <AvatarFallback>
                      {user.login.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button disabled={!selected} onClick={handleClick}>
          Ver perfil
        </Button>
        {selected && (
          <span className="text-sm text-muted-foreground">
            Selecionado: {selected}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserSearchBar;
