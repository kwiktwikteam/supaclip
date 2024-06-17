
import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "~/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SupaClip Pro",
  description: "SupaClip allow you to instantly create a website from your video with a AI assistant to solve your problems",
  icons: [{ rel: "icon", url: "/logo.svg" }],
  twitter: {
    card: "summary_large_image",
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <CSPostHogProvider> */}
      {/* <CSPostHogProvider> */}
      <SessionProvider>
        <body className={`font-sans ${inter.variable} h-full w-full`}>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
      {/* </CSPostHogProvider> */}
      {/* </CSPostHogProvider> */}

      <GoogleAnalytics gaId="G-E6J1E0YXT3" />
    </html>
  );
}
