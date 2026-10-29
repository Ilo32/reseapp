"use client";

import { updateListUrl } from "./use-list-params";

export const ResultsId = "country-results";

const ButtonStyle =
  "rounded-md bg-slate-900 px-4 py-2 font-medium text-sky-400 ring-1 ring-slate-700 hover:bg-slate-800 disabled:invisible";

export default function Pagination({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}) {
  function goToPage(newPage: number) {
    updateListUrl({ page: String(newPage) });
    window.scrollTo({ top: 0 });
    document.getElementById(ResultsId)?.focus({ preventScroll: true });
  }

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-4">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className={ButtonStyle}
      >
        Previous
      </button>
      <p className="text-sm text-slate-400">
        Page {currentPage} of {pageCount}
      </p>
      <button
        type="button"
        disabled={currentPage === pageCount}
        onClick={() => goToPage(currentPage + 1)}
        className={ButtonStyle}
      >
        Next
      </button>
    </nav>
  );
}
