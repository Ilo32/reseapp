import type { ListCountry } from "@/app/lib/types";

type Compare = (a: ListCountry, b: ListCountry) => number;

const byName: Compare = (a, b) => a.name.localeCompare(b.name, "en");
const byPopulation: Compare = (a, b) => a.population - b.population;
const byArea: Compare = (a, b) => (a.area ?? 0) - (b.area ?? 0);

export const SortOptions: { value: string; label: string; compare: Compare }[] = [
  { value: "", label: "Name (A-Z)", compare: byName },
  { value: "name-desc", label: "Name (Z-A)", compare: (a, b) => byName(b, a) },
  {
    value: "population-asc",
    label: "Population (low to high)",
    compare: byPopulation,
  },
  {
    value: "population-desc",
    label: "Population (high to low)",
    compare: (a, b) => byPopulation(b, a),
  },
  { value: "area-asc", label: "Area (small to large)", compare: byArea },
  {
    value: "area-desc",
    label: "Area (large to small)",
    compare: (a, b) => byArea(b, a),
  },
];

export function sortCountries(countries: ListCountry[], sort: string) {
  const selected =
    SortOptions.find((option) => option.value === sort) ?? SortOptions[0];

  return countries.toSorted(selected.compare);
}
