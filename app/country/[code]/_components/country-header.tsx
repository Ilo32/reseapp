import Image from "next/image";
import type { Country } from "@/app/lib/types";

export default function CountryHeader({ country }: { country: Country }) {
  return (
    <header className="flex items-center gap-4">
      <Image
        src={country.flags.svg}
        alt={`Flag of ${country.name}`}
        width={96}
        height={64}
        className="h-12 w-auto shrink-0 rounded sm:h-16 shadow-sm ring-1 ring-slate-800"
      />
      <div className="min-w-0">
        <h1 className="text-2xl font-bold break-words sm:text-3xl">{country.name}</h1>
        <p lang={country.languages?.[0]?.bcp47} className="text-lg text-slate-400">
          {country.nativeName}
        </p>
      </div>
    </header>
  );
}
