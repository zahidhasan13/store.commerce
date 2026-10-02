import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STORE. — Premium Electronics, Fashion & Home Essentials",
  description:
    "Discover top-quality electronics, trending fashion, cosmetics, and modern home essentials at STORE. Enjoy fast shipping and best online deals.",
  keywords: [
    "e-commerce",
    "online shopping",
    "electronics",
    "smartphones",
    "fashion",
    "beauty products",
    "home decor",
    "buy online",
  ],
  authors: [{ name: "STORE. Team" }],
  openGraph: {
    title: "STORE. — Premium Electronics, Fashion & Home Essentials",
    description:
      "Shop top-quality electronics, modern fashion, and home essentials with up to 40% OFF.",
    url: "https://yourdomain.com",
    siteName: "STORE.",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "STORE. E-commerce Homepage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STORE. — Premium Electronics, Fashion & Home Essentials",
    description:
      "Shop top-quality electronics, modern fashion, and home essentials with up to 40% OFF.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
