"use client";

import { useEffect, useState } from "react";
import { updateListUrl, useListParams } from "./use-list-params";

const Regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function SearchFilters() {
  const { query, region } = useListParams();
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
        {["All", ...Regions].map((name) => {
          const value = name === "All" ? "" : name;
          const selected = region === value;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={selected}
              onClick={() => updateListUrl({ region: value, page: "" })}
              className={
                selected
                  ? "rounded-full bg-sky-700 px-4 py-1.5 font-medium text-white"
                  : "rounded-full bg-slate-900 px-4 py-1.5 font-medium text-sky-400 ring-1 ring-slate-700 hover:bg-slate-800"
              }
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
