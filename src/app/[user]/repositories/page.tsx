"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import useUser from "@/features/hooks/useUser";

export default function Repositories() {
  const params = useParams();

  const { repos } = useUser(params.user as string);

  useEffect(() => {
    console.log("Repositories:", repos);
  }, [repos]);

  return <div></div>;
}
