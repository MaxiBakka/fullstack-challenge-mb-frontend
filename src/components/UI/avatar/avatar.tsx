import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { API_URL } from "../../../services/api/config";

interface AvatarProps {
  photo?: { path: string } | null;
  name: string;
}

export default function Avatar({ photo, name }: AvatarProps) {
  return (
    <>
      {photo?.path ? (
        <img
          className="flex mx-auto h-24 w-24 rounded-full sm:mx-0 sm:shrink-0 object-cover"
          src={`${photo.path}`}
          alt={`Avatar of ${name}`}
        />
      ) : (
        <div className="mx-auto h-24 w-24 rounded-full sm:mx-0 sm:shrink-0 bg-gray-200 flex items-center justify-center">
          <UserCircleIcon
            className="h-20 w-20 text-gray-400"
            aria-hidden="true"
          />
          <span className="sr-only">No avatar available for {name}</span>
        </div>
      )}
    </>
  );
}
