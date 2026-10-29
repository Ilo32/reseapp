import { Suspense } from "react";
import { getCountryList } from "./lib/countries";
import CountryList from "./_components/country-list/country-list";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold sm:text-3xl">Find Your Next Travel Destination</h1>
      <p className="mt-2 text-slate-400">
        Search among the world's countries and see basic facts, current weather and some
        inspiration for your trip.
      </p>

      <Suspense>
        <CountryList countriesPromise={getCountryList()} />
      </Suspense>
    </>
  );
}
