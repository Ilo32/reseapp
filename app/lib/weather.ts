import { cacheLife } from "next/cache";
import type { Coordinates, Weather } from "./types";

const WeatherTypes: [maxCode: number, description: string][] = [
  [0, "Clear Skies"],
  [2, "Partly Cloudy"],
  [3, "Cloudy"],
  [48, "Fog"],
  [57, "Light Rain"],
  [67, "Heavy Rain"],
  [77, "Snow"],
  [82, "Rain Showers"],
  [86, "Snow Showers"],
  [99, "Thunderstorm"],
];

export async function findCity(name: string, countryCode: string): Promise<Coordinates | null> {
  "use cache";
  cacheLife("weeks");

  const params = new URLSearchParams({ name, countryCode, count: "1" });
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?${params}`,
  );
  if (!response.ok) return null;

  const data = await response.json();
  const city = data.results?.[0];
  return city ? { latitude: city.latitude, longitude: city.longitude } : null;
}

export async function getWeather({ latitude, longitude }: Coordinates): Promise<Weather | null> {
  "use cache";
  cacheLife("minutes");

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,wind_speed_10m,weather_code",
    wind_speed_unit: "ms",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
  );
  if (!response.ok) return null;

  const { current } = await response.json();
  const [, description] =
    WeatherTypes.find(([maxCode]) => current.weather_code <= maxCode) ??
    WeatherTypes[WeatherTypes.length - 1];

  return {
    temperature: Math.round(current.temperature_2m),
    windSpeed: Math.round(current.wind_speed_10m),
    description,
  };
}
