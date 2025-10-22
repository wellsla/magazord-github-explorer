"use client";
import {
  getUserData,
  getUserSocialAccounts,
  getUserRepositories,
} from "@/services/github/users";
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

    const fetchUserSocialAccounts = async () => {
      if (params.user) {
        try {
          const socialAccounts = await getUserSocialAccounts(
            params.user as string
          );
          console.log(socialAccounts);
        } catch (error) {
          console.error("Error fetching user social accounts:", error);
        }
      }
    };
    fetchUserSocialAccounts();

    const fetchUserRepositories = async () => {
      if (params.user) {
        try {
          const repositories = await getUserRepositories(
            params.user as string,
            { sort: "updated" }
          );
          console.log(repositories);
        } catch (error) {
          console.error("Error fetching user repositories:", error);
        }
      }
    };
    fetchUserRepositories();
  }, [params.user]);

  return <div></div>;
}
