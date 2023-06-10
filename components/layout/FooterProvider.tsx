"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/footer";

export const FooterProvider = () => {
  const pathname = usePathname();
  return (
    <>{pathname !== "/workout" && pathname !== "/profile" && <Footer />}</>
  );
};
