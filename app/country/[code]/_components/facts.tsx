import type { Country } from "@/app/lib/types";
import FactList from "@/app/_components/ui/fact-list";
import Section from "@/app/_components/ui/section";

export default function Facts({ country }: { country: Country }) {
  const languages = country.languages?.map((language) => language.name) ?? [];
  const currencies =
    country.currencies?.map((currency) =>
      currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name,
    ) ?? [];

  return (
    <Section title="Facts">
      <FactList
        facts={[
          ["Region", country.subregion ? `${country.region}, ${country.subregion}` : country.region],
          ["Capital", country.capital || "saknas"],
          ["Population", country.population.toLocaleString("sv-SE")],
          ["Language", languages.join(", ") || "saknas"],
          ["Currency", currencies.join(", ") || "saknas"],
        ]}
      />
    </Section>
  );
}
