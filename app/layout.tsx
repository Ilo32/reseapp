import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Travel Explorer",
    template: "%s - Travel Explorer",
  },
  description:
    "facts, weather and inspiration for your next travel destination",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-slate-950 font-sans text-slate-100">
        <header className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <Link href="/" className="text-xl font-bold">
              <p>Travel Explorer</p>
            </Link>
          </div>
        </header>

        <main
          id="content"
          className="mx-auto w-full max-w-6xl flex-1 px-4 py-8"
        >
          {children}
        </main>

        <footer className="border-t border-slate-800 bg-slate-900">
          <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-slate-400">
            {/* Had to add the bracket space parts to signal to react that there should be a space there. */}
            Data from <a href="https://restcountries.com/">REST Countries</a>,{" "}
            <a href="https://https://open-meteo.com/">Open-Mateo</a>,{" "}
            <a href="https://www.wikipedia.org/">Wikipedia</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
