export type Country = {
  name: string;
  nativeName: string;
  alpha3Code: string;
  alpha2Code: string;
  region: string;
  subregion?: string;
  capital?: string;
  population: number;
  flags: { svg: string };
  languages?: { name: string; iso639_1?: string }[];
  currencies?: { name: string; symbol?: string }[];
  latlng?: [number, number];
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Weather = {
  temperature: number;
  windSpeed: number;
  description: string;
};

export type WikiSummary = {
  title: string;
  extract: string;
  url: string;
  image: { src: string; width: number; height: number } | null;
};

export type ListCountry = Pick<Country, "name" | "alpha3Code" | "region" | "capital" | "flags">;
