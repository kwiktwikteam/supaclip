// import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";

// note: logger is not available in middleware, using console.log instead

export const config = {
  matcher: [
    "/",
    // "/c/*"
  ],
};

export async function middleware(req: NextRequest) {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const hostname = req.headers.get("host")!;
  const reqPathName = req.nextUrl.pathname;
//   const sessionRequired = ["/account", "/api/account"];
//   const adminRequired = ["/admin", "/api/admin"];
//   const adminUsers = process.env.ADMIN_USERS.split(",");
  const hostedDomain = process.env.NEXT_PUBLIC_BASE_URL!.replace(
    /http:\/\/|https:\/\//,
    "",
  );
  const hostedDomains = [hostedDomain, `www.${hostedDomain}`];
  console.log(reqPathName, "pathname")
  // if custom domain + on root path
  if (!hostedDomains.includes(hostname) && reqPathName === "/") {
    console.log(`custom domain used: "${hostname}"`);

    // let res;
    // let profile;
    // let url = `${
    //   process.env.NEXT_PUBLIC_BASE_URL
    // }/api/search/${encodeURIComponent(hostname)}`;
    // try {
    //   res = await fetch(url, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   profile = await res.json();
    // } catch (e) {
    //   console.error(url, e);
    //   return NextResponse.error(e);
    // }

    // if (
    //   profile?.username &&
    //   profile.settings?.domain &&
    //   profile.settings.domain === hostname
    // ) {
    //   console.log(
    //     `custom domain matched "${hostname}" for username "${profile.username}" (protocol: "${protocol}")`,
    //   );
      // if match found rewrite to custom domain and display profile page
      return NextResponse.rewrite(
        new URL(
          `/c`,
          `${protocol}://localhost:5000`,
        ),
      );
    }

    console.error(`custom domain NOT matched "${hostname}"`);
    return NextResponse.next();
    
} 
