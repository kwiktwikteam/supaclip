
import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "~/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SupaClip Pro",
  description: "SupaClip allow you to instantly create a website from your video with a AI assistant to solve your problems",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <CSPostHogProvider> */}
      <head>
        {/* <Script id="post_hog">
          {`
          !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
          posthog.init('${process.env.NEXT_PUBLIC_POST_HOG}',{api_host: ${process.env.NEXT_PUBLIC_POSTHOG_HOST}})
          i
        `}
        </Script> */}

        <script
          defer
          data-domain="supaclip.pro"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <SessionProvider>
        <body className={`font-sans ${inter.variable} h-full w-full`}>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
      {/* </CSPostHogProvider> */}
    </html>
  );
}
