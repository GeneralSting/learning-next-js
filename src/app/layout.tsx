import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/global/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Meeting Rooms - NextJS",
    template: "%s - NextJS",
  },
  description: "NextJS Meeting Rooms Metadata description",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.3)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Link href="/">
                <nav>Meetings Schedular</nav>
              </Link>
              {/* <nav>
                <ThemeToggle />
              </nav> */}
            </div>
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
