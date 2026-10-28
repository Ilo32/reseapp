"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BackLink() {
  const listParams = useSearchParams().toString();

  return (
    <Link
      href={listParams ? `/?${listParams}` : "/"}
      className="text-sky-400 underline"
    >
      Return
    </Link>
  );
}
