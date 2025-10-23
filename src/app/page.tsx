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
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-[#262626]">
            GitHub Explorer
          </h1>
          <p className="text-lg text-[#989898]">
            Explore GitHub repositories easily
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#989898]" />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.trim())}
            onKeyDown={handleKeyDown}
            placeholder="Search GitHub users..."
            className="pl-10 h-12 text-lg text-[#262626] border-[#E5E7EB] focus:ring-[#0587FF]"
            autoFocus
          />
          {searchQuery.length > 0 && searchQuery.length < 4 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#989898]">
              {searchQuery.length}/4
            </div>
          )}
        </div>

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
                    <p className="font-medium text-[#262626]">{user.login}</p>
                    {user.name && (
                      <p className="text-sm text-[#989898] truncate">
                        {user.name}
                      </p>
                    )}
                  </div>
                  {selectedUser === user.login && (
                    <div className="h-2 w-2 rounded-full bg-[#0587FF]" />
                  )}
                </li>
              ))}
            </ul>
          </Card>
        )}

        {isLoading && searchQuery && (
          <Card className="p-4 text-center text-[#989898] border-[#E5E7EB]">
            Loading...
          </Card>
        )}

        {!isLoading &&
          searchQuery &&
          data?.items &&
          data.items.length === 0 && (
            <Card className="p-4 text-center text-[#989898] border-[#E5E7EB]">
              No users found for &quot;{searchQuery}&quot;.
            </Card>
          )}

        <div className="flex flex-col items-center gap-3">
          <Button
            size="lg"
            disabled={!selectedUser}
            onClick={handleViewProfile}
            className="w-full max-w-xs cursor-pointer"
          >
            View Profile
          </Button>
        </div>

        <p className="text-center text-sm text-[#989898]">
          {searchQuery.length > 0 && searchQuery.length < 4
            ? `Type at least ${4 - searchQuery.length} more character${
                4 - searchQuery.length > 1 ? "s" : ""
              } to search`
            : "Write a user's name and select from the list or press Enter."}
        </p>
      </div>
    </section>
  );
};

export default Home;
