import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-400">
        The country or page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6 inline-block text-sky-400 underline">
        Return
      </Link>
    </div>
  );
}
