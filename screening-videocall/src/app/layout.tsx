import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInScreen from "@/components/SignInScreen"; 
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Screening App",
  description: "AI-powered smart interview platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="min-h-screen">
                <Navbar />
                <main className="px-1 sm:px-2 lg:px-4">{children}</main>
              </div>
            </SignedIn>

            <SignedOut>
              <SignInScreen />
            </SignedOut>
          </ThemeProvider>
          <Toaster/>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
