import { Suspense } from "react";
import { SectionFallback } from "@/app/_components/ui/section";
import { getCountry } from "@/app/lib/countries";
import { notFound } from "next/navigation";

import CountryHeader from "./country-header";
import CurrentWeather from "./current-weather";
import Facts from "./facts";
import Intro from "./intro";

export async function CountryContent({
  params,
}: Pick<PageProps<"/country/[code]">, "params">) {
  const { code } = await params;
  const country = await getCountry(code);
  if (!country) notFound();

  return (
    <article className="mt-6 space-y-8">
      <CountryHeader country={country} />

      <div className="grid gap-6 md:grid-cols-2">
        <Facts country={country} />
        <Suspense fallback={<SectionFallback title="Weather" />}>
          <CurrentWeather country={country} />
        </Suspense>
      </div>

      <Suspense fallback={<SectionFallback title={`About ${country.name}`} />}>
        <Intro country={country} />
      </Suspense>
    </article>
  );
}
