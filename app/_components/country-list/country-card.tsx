import Image from "next/image";
import Link from "next/link";
import type { ListCountry } from "@/app/lib/types";

export default function CountryCard({
  country,
  listParams,
}: {
  country: ListCountry;
  listParams: string;
}) {
  const href = listParams
    ? `/country/${country.alpha3Code}?${listParams}`
    : `/country/${country.alpha3Code}`;

  return (
    <Link
      href={href}
      prefetch={false}
      className="block h-full overflow-hidden rounded-lg bg-slate-900 shadow-sm ring-1 ring-slate-800 transition hover:shadow-md hover:ring-sky-500"
    >
      {country.flags.svg ? (
        <Image
          src={country.flags.svg}
          alt={`flag of ${country.name}`}
          width={320}
          height={213}
          className="h-32 w-full bg-slate-800 object-contain p-4"
        />
      ) : (
        <div className="flex h-32 w-full items-center justify-center bg-slate-800 text-sm text-slate-400">
          No flag available
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{country.name}</h2>
        <p className="text-sm text-slate-400">
          Capital: {country.capital || "Unknown"}
        </p>
        <p className="text-sm text-slate-400">Region: {country.region}</p>
      </div>
    </Link>
  );
}
