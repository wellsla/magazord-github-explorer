"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [username, setUsername] = useState("");

  return (
    <div>
      <input
        type="text"
        value={username}
        placeholder="GitHub username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Link href={`/${username}`}>
        <Button>Procurar</Button>
      </Link>
    </div>
  );
}
