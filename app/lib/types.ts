export type Country = {
  name: string;
  nativeName: string;
  alpha3Code: string;
  alpha2Code: string;
  region: string;
  subregion?: string;
  capital?: string;
  population: number;
  area?: number;
  flags: { svg: string };
  languages?: { name: string; bcp47?: string }[];
  currencies?: { name: string; symbol?: string }[];
  latlng?: [number, number];
};

export type ApiCountry = {
  names: { common: string; native?: Record<string, { common: string }> };
  codes: { alpha_2: string; alpha_3: string };
  region: string;
  subregion?: string;
  capitals?: { name: string }[];
  population: number;
  area?: { kilometers: number };
  flag: { url_svg: string };
  languages?: { name: string; bcp47?: string }[];
  currencies?: { name: string; symbol?: string }[];
  coordinates?: { lat: number; lng: number };
};

export type ApiResponse = {
  data: { objects: ApiCountry[]; meta?: { more?: boolean } };
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

export type ListCountry = Pick<
  Country,
  "name" | "alpha3Code" | "region" | "capital" | "flags" | "population" | "area"
>;
