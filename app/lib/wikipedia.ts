import { cacheLife } from "next/cache";
import type { WikiSummary } from "./types";

export async function getWikiSummary(title: string): Promise<WikiSummary | null> {
  "use cache";
  cacheLife("days");

  const path = encodeURIComponent(title.replaceAll(" ", "_"));
  const response = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${path}`,
  );
  if (!response.ok) return null;

  const data = await response.json();
  if (data.type !== "standard") return null;

  return {
    title: data.title,
    extract: data.extract,
    url: data.content_urls.desktop.page,
    image: data.thumbnail
      ? {
          src: data.thumbnail.source,
          width: data.thumbnail.width,
          height: data.thumbnail.height,
        }
      : null,
  };
}
