import type { Metadata } from "next";
import { Pacifico, Oswald, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ember & Crust | Wood Fired Pizza Kitchen in Chicago",
  description:
    "Ember & Crust bakes real wood fired pizza on Fulton Market in Chicago. Dough made every morning, oak burning at 900 degrees, delivery and pickup seven days a week.",
  keywords: [
    "pizza",
    "wood fired pizza",
    "Chicago pizza",
    "food delivery",
    "Ember & Crust",
  ],
  icons: {
    icon: "/flame.svg",
  },
  openGraph: {
    title: "Ember & Crust | Wood Fired Pizza Kitchen",
    description:
      "Real dough, real fire, real good. Order wood fired pizza for delivery or pickup.",
    siteName: "Ember & Crust",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pacifico.variable} ${oswald.variable} ${poppins.variable} antialiased bg-white text-ink`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
