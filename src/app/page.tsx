"use client";

import UserSearchBar from "@/components/search/UserSearchBar";

export default function Home() {
  return (
    <section className="h-[calc(100vh-56px)] grid place-items-center">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-2xl font-semibold mb-6">
          Explore repositórios GitHub de usuários facilmente
        </h1>
        <UserSearchBar />
      </div>
    </section>
  );
}
