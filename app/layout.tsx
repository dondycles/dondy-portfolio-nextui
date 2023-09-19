import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextUIProvider } from "./components/providers/nextUiProvider";

const roboto = Poppins({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "John Rod Dondoyano | Portfolio",
  description: "A portfolio for professional purposes.",
  twitter: {
    title: "John Rod Dondoyano | Portfolio",
    description: "A portfolio for professional purposes.",
    card: "summary_large_image",
    creator: "@dondycles",
    images: {
      url: "/images/avatars/me2.jpg",
      alt: "John Rod Dondoyano",
    },
  },
  openGraph: {
    title: "John Rod Dondoyano | Portfolio",
    description: "A portfolio for professional purposes.",
    type: "website",
    siteName: "John Rod Dondoyano | Portfolio",
    url: "johnrod.dev",
    images: [
      {
        url: "/images/avatars/me1.jpg",
        width: 900,
        height: 900,
      },
      {
        url: "/images/avatars/me2.jpg",
        width: 900,
        height: 900,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
