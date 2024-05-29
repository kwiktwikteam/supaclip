/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { InferSelectModel } from "drizzle-orm";
import { profiles } from "./server/db/schema";

type Profile = InferSelectModel<typeof profiles>;
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/| _next/image|images|icons|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${
      process.env.NEXT_PUBLIC_ROOT_DOMAIN
    }`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
    // const session = await getToken({ req });
    // if (!session && path !== "/login") {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // } else if (session && path == "/login") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    return NextResponse.rewrite(
      // new URL(`/app${path === "/" ? "" : path}`, req.url),
      new URL(`${path === "/" ? "" : path}`, req.url),
    );
  }

  // special case for `vercel.pub` domain
  if (hostname === "vercel.app") {
    return NextResponse.redirect(
      "https://www.supaclip.pro",
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  // console.log("This ran")

  try {
    const data = await fetch(`/api/profile/domain/${hostname}`);

    const response: Promise<{
      status: boolean; 
      message: string;
      profile?: Profile | undefined;
    }> = await data.json();

    if(!response.status){
      return NextResponse.rewrite("https://www.supaclip.pro")
    } else if(response.status && !response.profile?.domainVerified) {
      return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));    
    }
    return NextResponse.rewrite(new URL(`/${hostname}${path}?creatorId=${response?.profile?.userId ?? ""}`, req.url));

  } catch (error) {
    return NextResponse.rewrite("https://www.supaclip.pro"); 
  }
}