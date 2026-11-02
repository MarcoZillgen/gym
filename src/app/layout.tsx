import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "simple gyming - made with love",
  description: "Gym app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${mono.variable} ${inter.variable} fixed flex h-full w-full justify-around overflow-hidden overscroll-y-none font-sans antialiased`}
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: localStorage used as strict comparison value, preventing unauthorized code execution
          dangerouslySetInnerHTML={{
            __html: `
                      try {
                        const stored = localStorage.getItem('workout-settings-storage');
                        const theme = stored ? JSON.parse(stored).state.theme : 'dark';
                        if (theme === 'dark') {
                          document.documentElement.classList.add('dark');
                        } else {
                          document.documentElement.classList.remove('dark');
                        }
                      } catch (e) {}
                  `,
          }}
        />
      </head>
      <body className="fixed flex min-h-full w-full max-w-125 flex-col overflow-hidden overscroll-none overscroll-y-none bg-bg text-text-standard">
        {children}
      </body>
    </html>
  );
}
