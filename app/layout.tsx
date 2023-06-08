import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import React from "react";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
  title: "Fitnnes",
  description: "Es una aplicacion de fitness",
  twitter: {
    card: "summary_large_image",
    title: "Precedent - Building blocks for your Next.js project",
    description:
      "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
    creator: "@steventey",
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
          {/* @ts-expect-error Server Component */}
          <Nav />
        </Suspense>
        <main className="flex min-h-screen w-full flex-col items-center bg-primary-400 py-16">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
