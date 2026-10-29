"use client";

import { useSearchParams } from "next/navigation";

export function useListParams() {
  const searchParams = useSearchParams();

  return {
    query: searchParams.get("query") ?? "",
    region: searchParams.get("region") ?? "",
    sort: searchParams.get("sort") ?? "",
    page: Number(searchParams.get("page")) || 1,
    listParams: searchParams.toString(),
  };
}

export function updateListUrl(changes: Record<string, string>, replace = false) {
  const params = new URLSearchParams(window.location.search);

  for (const [key, value] of Object.entries(changes)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }

  const url = params.size > 0 ? `/?${params}` : "/";

  if (replace) window.history.replaceState(null, "", url);
  else window.history.pushState(null, "", url);
}
