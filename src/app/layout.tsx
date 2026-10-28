import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "simple gyming - made with love",
  description: "Gym app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} font-inter fixed flex h-full w-full justify-around overflow-hidden overscroll-y-none antialiased`}
    >
      <body className="fixed flex min-h-full w-full max-w-125 flex-col overflow-hidden overscroll-none overscroll-y-none bg-bg text-text-standard">
        {children}
      </body>
    </html>
  );
}
