import Image from "next/image";
import type { Country } from "@/app/lib/types";

export default function CountryHeader({ country }: { country: Country }) {
  return (
    <header className="flex items-center gap-4">
      <Image
        src={country.flags.svg}
        alt={`flag of ${country.name}`}
        width={96}
        height={64}
        className="h-16 w-auto rounded shadow-sm ring-1 ring-slate-800"
      />
      <div>
        <h1 className="text-3xl font-bold">{country.name}</h1>
        <p lang={country.languages?.[0]?.iso639_1} className="text-lg text-slate-400">
          {country.nativeName}
        </p>
      </div>
    </header>
  );
}
