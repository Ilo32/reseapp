import { cacheLife } from "next/cache";
import type { Country, ListCountry } from "./types";

const API = "https://countries.dev";

export async function getCountryList(): Promise<ListCountry[]> {
  "use cache";
  cacheLife("days");

  const response = await fetch(
    `${API}/countries?fields=name,alpha3Code,region,capital,flags`,
  );
  if (!response.ok) throw new Error("Couldn't fetch countries");

  return response.json();
}

export async function getCountry(code: string): Promise<Country | null> {
  "use cache";
  cacheLife("days");

  const response = await fetch(`${API}/alpha/${encodeURIComponent(code)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Couldn't fetch country");

  return response.json();
}
