import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getCountry } from "@/app/lib/countries";
import BackLink from "@/app/_components/back-link";
import Spinner from "@/app/_components/ui/spinner";
import { CountryContent } from "./_components/country-content";

export async function generateMetadata({
  params,
}: PageProps<"/country/[code]">): Promise<Metadata> {
  const { code } = await params;
  const country = await getCountry(code);
  return { title: country?.name ?? "Country Not Found" };
}

export default function CountryPage({ params }: PageProps<"/country/[code]">) {
  return (
    <>
      <Suspense
        fallback={
          <Link href="/" className="text-sky-400 underline">
            Return
          </Link>
        }
      >
        <BackLink />
      </Suspense>

      <Suspense fallback={<Spinner className="py-24" />}>
        <CountryContent params={params} />
      </Suspense>
    </>
  );
}