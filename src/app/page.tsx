"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchUsers } from "@/features/hooks/useSearch";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/avatar";
import { Search } from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const router = useRouter();

  // Busca usuários na API do GitHub (debounce já implementado no hook)
  const { data, isLoading } = useSearchUsers(searchQuery, {
    per_page: 5,
  });

  const handleUserSelect = (username: string) => {
    setSelectedUser(username);
  };

  const handleViewProfile = () => {
    if (selectedUser) {
      router.push(`/${selectedUser}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedUser) {
      handleViewProfile();
    }
  };

  return (
    <section className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Título */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">GitHub Explorer</h1>
          <p className="text-lg text-muted-foreground">
            Explore GitHub repositories easily
          </p>
        </div>

        {/* Campo de Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.trim())}
            onKeyDown={handleKeyDown}
            placeholder="Search GitHub users..."
            className="pl-10 h-12 text-lg"
            autoFocus
          />
        </div>

        {/* Resultados da Busca */}
        {searchQuery && data?.items && data!.items.length > 0 && (
          <Card className="p-2 max-h-80 overflow-y-auto">
            <ul className="space-y-1">
              {data!.items.map((user) => (
                <li
                  key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                    selectedUser === user.login ? "bg-muted" : ""
                  }`}
                  onClick={() => handleUserSelect(user.login)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.avatar_url || undefined}
                      alt={user.name || user.login}
                    />
                    <AvatarFallback>
                      {user.login.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{user.login}</p>
                    {user.name && (
                      <p className="text-sm text-muted-foreground truncate">
                        {user.name}
                      </p>
                    )}
                  </div>
                  {selectedUser === user.login && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Mensagem de carregamento */}
        {isLoading && searchQuery && (
          <Card className="p-4 text-center text-muted-foreground">
            Loading...
          </Card>
        )}

        {/* Mensagem quando não encontra resultados */}
        {!isLoading &&
          searchQuery &&
          data?.items &&
          data.items.length === 0 && (
            <Card className="p-4 text-center text-muted-foreground">
              No users found for &quot;{searchQuery}&quot;.
            </Card>
          )}

        {/* Botão de perfil */}
        <div className="flex flex-col items-center gap-3">
          <Button
            size="lg"
            disabled={!selectedUser}
            onClick={handleViewProfile}
            className="w-full max-w-xs"
          >
            View Profile
          </Button>
        </div>

        {selectedUser && (
          <p className="text-sm text-muted-foreground">
            Selected User:{" "}
            <span className="font-medium text-foreground">{selectedUser}</span>
          </p>
        )}

        {/* Dica */}
        <p className="text-center text-sm text-muted-foreground">
          Write a user&apos;s name and select from the list or press Enter.
        </p>
      </div>
    </section>
  );
};

export default Home;
