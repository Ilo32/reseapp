"use client";

import { Suspense } from "react";
import type { ListCountry } from "@/app/lib/types";
import Spinner from "../ui/spinner";
import CountryResults from "./country-results";
import SearchFilters from "./search-filters";

export default function CountryList({
  countriesPromise,
}: {
  countriesPromise: Promise<ListCountry[]>;
}) {
  return (
    <>
      <SearchFilters />
      <Suspense fallback={<Spinner className="py-24" />}>
        <CountryResults countriesPromise={countriesPromise} />
      </Suspense>
    </>
  );
}
