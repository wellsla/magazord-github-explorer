"use client";
import { getUserData } from "@/services/github/userService";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function User() {
  const params = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      if (params.user) {
        try {
          const data = await getUserData(params.user as string);
          console.log(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [params.user]);

  return <div></div>;
}
