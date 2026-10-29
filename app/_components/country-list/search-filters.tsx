"use client";

import { useEffect, useState } from "react";
import { SortOptions } from "./sort";
import { updateListUrl, useListParams } from "./use-list-params";

const RegionOptions = [
  { value: "", label: "All" },
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

export default function SearchFilters() {
  const { query, region, sort } = useListParams();
  const [searchText, setSearchText] = useState(query);

  useEffect(() => {
    function syncSearchText() {
      setSearchText(new URLSearchParams(window.location.search).get("query") ?? "");
    }
    window.addEventListener("popstate", syncSearchText);
    return () => window.removeEventListener("popstate", syncSearchText);
  }, []);

  function search(text: string) {
    setSearchText(text);
    updateListUrl({ query: text, page: "" }, true);
  }

  return (
    <div className="mt-6 space-y-4 rounded-lg bg-slate-900 p-4 shadow-sm ring-1 ring-slate-800">
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <input
          id="query"
          type="search"
          value={searchText}
          onChange={(event) => search(event.target.value)}
          placeholder="t.ex. Finland"
          className="mt-1 w-full rounded-md border border-slate-600 bg-slate-950 px-3 py-2"
        />
      </form>

      <div role="group" aria-label="Filtrera på region" className="flex flex-wrap gap-2">
        {RegionOptions.map((option) => {
          const selected = region === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => updateListUrl({ region: option.value, page: "" })}
              className={
                selected
                  ? "rounded-full bg-sky-700 px-4 py-1.5 font-medium text-white"
                  : "rounded-full bg-slate-900 px-4 py-1.5 font-medium text-sky-400 ring-1 ring-slate-700 hover:bg-slate-800"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-400">
        Sort by
        <select
          value={sort}
          onChange={(event) => updateListUrl({ sort: event.target.value, page: "" })}
          className="rounded-md border border-slate-600 bg-slate-950 px-3 py-2 text-slate-100"
        >
          {SortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
