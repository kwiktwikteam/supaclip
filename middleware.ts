/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { type InferSelectModel } from "drizzle-orm";
import { type profiles } from "./src/server/db/schema";

type Profile = InferSelectModel<typeof profiles>;
export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|icons|images|[\\w-]+\\.\\w+).*)",
  ]
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    .get("host")!
    .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // special case for Vercel preview deployment URLs
  // if (
    
  //   hostname.endsWith(`${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  // ) {
  //   hostname = `${hostname.split("---")[0]}.${
  //     process.env.NEXT_PUBLIC_ROOT_DOMAIN
  //   }`;
  // }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  // if (hostname == `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
  //   // const session = await getToken({ req });
  //   // if (!session && path !== "/login") {
  //   //   return NextResponse.redirect(new URL("/login", req.url));
  //   // } else if (session && path == "/login") {
  //   //   return NextResponse.redirect(new URL("/", req.url));
  //   // }
  //   console.log("ran 1")
  //   return NextResponse.rewrite(
  //     // new URL(`/app${path === "/" ? "" : path}`, req.url),
  //     new URL(`${path === "/" ? `/${hostname}` : path}`, req.url),
  //   );
  // }
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/domain/${hostname}`, {
      method: "POST"
    });
    // console.log("This ran")
    const response: {
      status: boolean; 
      message: string;
      profile?: Profile | undefined;
    }= await data.json();

    console.log("ran 2")
    if(response.status && response.profile?.domainVerified) {
      return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
    }
    // return NextResponse.rewrite(new URL((path == "/" || !path) ? `/${hostname}${path}`: path + `?creatorId${response.profile?.userId ?? ""}`, req.url));

  } catch (error) {
    console.log("ran 3")
    console.log(error.message)
    return NextResponse.next(); 
  }
}