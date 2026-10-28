"use client";

export default function Error({ retry }: { retry: () => void }) {
  return (
    <div role="alert" className="py-16 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-slate-400">
        We couldnt fetch the data right now. Please try again in a little while.
      </p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-6 rounded-md bg-sky-700 px-6 py-2 font-medium text-white hover:bg-sky-800"
      >
        Try again
      </button>
    </div>
  );
}
