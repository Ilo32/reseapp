"use client";

import { use } from "react";
import type { ListCountry } from "@/app/lib/types";
import CountryCard from "./country-card";
import Pagination from "./pagination";
import { useListParams } from "./use-list-params";

export default function CountryResults({countriesPromise}: {countriesPromise: Promise<ListCountry[]>}) {
  const countries = use(countriesPromise);
  const { query, region, page, listParams } = useListParams();

  const matches = countries.filter(
    (country) =>
      (!region || country.region === region) &&
      country.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const pageCount = Math.max(1, Math.ceil(matches.length / 24));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const visibleCountries = matches.slice(
    (currentPage - 1) * 24,
    currentPage * 24,
  );

  return (
    <>
      <p role="status" className="mt-6 text-sm text-slate-400">
        {matches.length === 0
          ? "Inga länder matchar dina kriterier"
          : `${matches.length} ${matches.length === 1 ? "land" : "länder"}`}
      </p>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleCountries.map((country) => (
          <li key={country.alpha3Code}>
            <CountryCard country={country} listParams={listParams} />
          </li>
        ))}
      </ul>

      {pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} />}
    </>
  );
}
