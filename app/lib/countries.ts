import { cacheLife } from "next/cache";
import type { Country, ListCountry, ApiCountry, ApiResponse } from "./types";

const ListFields =
  "names.common,codes.alpha_3,region,capitals,flag.url_svg,population,area.kilometers";

function fetchApi(path: string) {
  return fetch(`https://api.restcountries.com/countries/v5${path}`, {
    headers: { Authorization: `Bearer ${process.env.RESTCOUNTRIES_API_KEY}` },
  })
}

function toListCountry(country: ApiCountry): ListCountry {
  return {
    name: country.names.common,
    alpha3Code: country.codes.alpha_3,
    region: country.region,
    capital: country.capitals?.[0]?.name,
    flags: { svg: country.flag.url_svg },
    population: country.population,
    area: country.area?.kilometers,
  }
}

function toCountry(country: ApiCountry): Country {
  const nativeNames = Object.values(country.names.native ?? {})

  return {
    ...toListCountry(country),
    nativeName: nativeNames[0]?.common ?? country.names.common,
    alpha2Code: country.codes.alpha_2,
    subregion: country.subregion,
    languages: country.languages,
    currencies: country.currencies,
    latlng: country.coordinates
      ? [country.coordinates.lat, country.coordinates.lng]
      : undefined,
  }
}

/* Basically a loop to get all the countries and cache it. */
export async function getCountryList(): Promise<ListCountry[]> {
  "use cache"
  cacheLife("days")

  const countries: ApiCountry[] = []
  let more = true

  while (more) {
    const params = new URLSearchParams({
      response_fields: ListFields,
      limit: "100",
      offset: String(countries.length),
    })

    const response = await fetchApi(`?${params}`)
    if (!response.ok) throw new Error("Couldn't fetch countries")

    const { data }: ApiResponse = await response.json()
    countries.push(...data.objects)
    more = Boolean(data.meta?.more) && data.objects.length > 0
  }

  return countries.map(toListCountry)
}

export async function getCountry(code: string): Promise<Country | null> {
  "use cache"
  cacheLife("days")

  const response = await fetchApi(`/codes.alpha_3/${encodeURIComponent(code)}`)

  if (response.status === 404) return null
  if (!response.ok) throw new Error("Couldn't fetch country")

  const { data }: ApiResponse = await response.json()
  return data.objects[0] ? toCountry(data.objects[0]) : null
}