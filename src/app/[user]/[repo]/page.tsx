"use client";

// import { useParams } from "next/navigation";
// import { useEffect } from "react";
// import useRepo from "@/features/hooks/useRepo";

export default function Repo() {
  // const params = useParams();

  // const { repo, issues } = useRepo(
  //   params.user as string,
  //   params.repo as string
  // );

  // useEffect(() => {
  //   console.log("Repository Data:", repo);
  // }, [repo]);

  // useEffect(() => {
  //   console.log("Issues Data:", issues);
  // }, [issues]);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-lg font-semibold">Issues</h2>
        <div className="">
          {/* {issues?.map((issue) => (
            <div key={issue.id} className="p-4 border rounded-md mb-2">
              <a
                href={issue.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {issue.title}
              </a>
              <p className="text-sm text-gray-600">{issue.user.login}</p>
            </div>
          ))} */}
        </div>
      </section>
    </div>
  );
}
