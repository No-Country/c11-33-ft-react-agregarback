import localFont from "next/font/local";
import { Inter,Roboto } from "next/font/google";

export const sfPro = localFont({
  src: "./SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight:['100',"300","400","500","700","900"]
});
