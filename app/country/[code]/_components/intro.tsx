import Image from "next/image";
import type { Country } from "@/app/lib/types";
import { getWikiSummary } from "@/app/lib/wikipedia";
import Section from "@/app/_components/ui/section";

export default async function Intro({ country }: { country: Country }) {
  const article = await getWikiSummary(country.name);

  if (!article) {
    return (
      <Section title={`About ${country.name}`}>
        <p>No intro text found for this country.</p>
      </Section>
    );
  }

  return (
    <Section title={`About ${country.name}`}>
      <div className="gap-6 md:flex">
        <div className="flex-1">
          <p className="leading-relaxed">{article.extract}</p>
          <p className="mt-3 text-sm text-slate-400">
            Source: Wikipedia.{" "}
            <a href={article.url} className="text-sky-400 underline">
              Read the full article about {article.title}
            </a>
          </p>
        </div>

        {article.image && (
          <Image
            src={article.image.src}
            alt={`Image from the Wikipedia article about ${article.title}`}
            width={article.image.width}
            height={article.image.height}
            className="mt-6 w-full shrink-0 rounded md:mt-0 md:w-64"
          />
        )}
      </div>
    </Section>
  );
}
