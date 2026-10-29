import type { Country } from "@/app/lib/types";
import { findCity, getWeather } from "@/app/lib/weather";
import FactList from "@/app/_components/ui/fact-list";
import Section from "@/app/_components/ui/section";

export default async function CurrentWeather({
  country,
}: {
  country: Country;
}) {
  const capitalCoordinates = country.capital
    ? await findCity(country.capital, country.alpha2Code)
    : null;
  const countryCenter = country.latlng
    ? { latitude: country.latlng[0], longitude: country.latlng[1] }
    : null;

  const place = capitalCoordinates ? country.capital : country.name;
  const coordinates = capitalCoordinates ?? countryCenter;
  const weather = coordinates ? await getWeather(coordinates) : null;

  if (!weather) {
    return (
      <Section title="Weather">
        <p>Weather information could not be retrieved.</p>
      </Section>
    );
  }

  return (
    <Section title={`Weather in ${place}`}>
      <FactList
        facts={[
          ["Current Weather", weather.description],
          ["Temperature", `${weather.temperature} °C`],
          ["Wind", `${weather.windSpeed} m/s`],
        ]}
      />
    </Section>
  );
}
