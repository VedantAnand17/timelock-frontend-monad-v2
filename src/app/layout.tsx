import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/providers/Providers";
// import { ReactScan } from "@/components/ReactScan";

const ibmFont = localFont({
  src: "./ibm.ttf",
  variable: "--font-ibm",
});

// TODO: Replace this later
export const metadata: Metadata = {
  title: "Timelock",
  description: "Timelock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* {process.env.NODE_ENV === "development" && <ReactScan />} */}
      <body className={`${ibmFont.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
