import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";
import React from "react";
import ToasterProvider from "./providers/ToasterProvider";
import { FooterProvider } from "@/components/layout/FooterProvider";

export const metadata = {
  title: "FitTrackr",
  description: "It is a fitness application",
  twitter: {
    card: "summary_large_image",
    title: "FitTrackr - It is a fitness application",
    description: "It is a fitness application",
  },
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cx(sfPro.variable, inter.variable, "bg-primary-400")}>
        <div className="fixed h-screen w-full from-indigo-50 via-white to-cyan-100" />
        <ToasterProvider />
        <Suspense fallback="...">
          {/* @ts-ignore */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center bg-primary-400 py-16">
          {children}
        </main>
        <Analytics />
        <FooterProvider />
      </body>
    </html>
  );
}
