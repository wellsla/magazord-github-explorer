"use client";

// import { useParams } from "next/navigation";
// import { useEffect } from "react";
// import useUser from "@/features/hooks/useUser";

export default function Starred() {
  // const params = useParams();

  // const { starreds } = useUser(params.user as string);

  // useEffect(() => {
  //   console.log("Starred Repositories Data:", starreds);
  // }, [starreds]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-center gap-4">
        Starreds
      </div>
      <div className="grid gap-3">
        {/* {starreds?.map((starred) => (
          <div key={starred.id} className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold">{starred.name}</h3>
            <p className="text-sm text-gray-600">{starred.description}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}
