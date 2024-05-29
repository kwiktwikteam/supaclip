
import { Session } from "inspector";
import { HomeIcon, Video } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import { auth } from "~/auth";
import FormProfile from "~/components/Profile/FormProfile";

import SignOut from "~/components/ui/SignOut";
import { domainConfigValuesAll } from "~/lib/domains";
import { getOrCreateProfile } from "~/lib/helpers/profile";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import verifyDomainValues from "~/config/domain.vercel";
export default async function Page({
  params,
}: {
  params: {
    creatorId: string;
  };
}) {


  const session = await auth();

  if(!session) {
    return redirect("/api/auth/signin?callbackUrl=/c/" + session?.user?.id);
  }

  const userProfile = await getOrCreateProfile();
  console.log("user profile ",userProfile) 

  let configResponse;
  if(userProfile?.domain) {
    configResponse = await domainConfigValuesAll(userProfile.domain, false);
  }
  return (
    <div className="relative mx-auto flex min-h-screen w-screen max-w-md justify-center  overflow-x-hidden  bg-black/80 pt-12 text-white">
      {/* <Image src='/images/hero/bg.png' alt="bg" layout="fill" className="-z-10" />
      <Image src="/bg.png" alt="bg" layout="fill" className="-z-20 opacity-50" /> */}

      <div className="w-full space-y-10 pb-32">
        {/* profile image */}

        <div className="profileimage text-center">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt={session?.user?.name ?? "Profile Image"}
              width={150}
              height={150}
              className="mx-auto h-16 w-16 rounded-full"
            />
          ) : (
            <MdAccountCircle className="mx-auto h-16 w-16 rounded-full text-white" />
          )}
          <p className="font-semibold">{session?.user?.name}</p>
          {!userProfile?.premiumUser && (
            <p className="w-responsive mx-auto my-4 rounded-full bg-yellow-600 px-2 py-2 text-center font-medium uppercase">
              Premium User
            </p>
          )}
        </div>

        {/* user info */}
        <div className="mx-auto w-[90%] space-y-4">
          {/* profile form - about, socials, domain */}
          <div className="form-group flex flex-col">
            <label>Name</label>
            <input
              type="text"
              defaultValue={session?.user?.name}
              disabled
              className="rounded-lg border bg-white/20 p-2 text-sm"
            />
          </div>
          <div className="form-group flex flex-col">
            <label>Email</label>
            <input
              type="email"
              defaultValue={session?.user?.email}
              disabled
              className="rounded-lg border bg-white/20 p-2 text-sm"
            />
          </div>

          {userProfile ? <FormProfile profile={userProfile} /> : null}

          {configResponse && (
            <>
              {configResponse.isDomainVerified ? (
                <div className="w-full rounded-md bg-green-400 py-2 text-center font-medium text-gray-600">
                  Custom Domain is working!
                </div>
              ) : configResponse.misconfigured?.status ? (
                <Table className="text-red-300">
                  <TableCaption>
                    Domain is misconfigured, add the above in your DNS.
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="*:font-bold *:text-red-400">
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className="text-right">TTL</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        {verifyDomainValues[0]?.Type}
                      </TableCell>
                      <TableCell>{verifyDomainValues[0]?.Name}</TableCell>
                      <TableCell>{verifyDomainValues[0]?.Value}</TableCell>
                      <TableCell className="text-right">
                        {verifyDomainValues[0]?.TTL}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Table className="text-red-300">
                  <TableCaption>
                    Add above to prove ownership of domain.
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="*:font-bold *:text-red-400">
                      <TableHead className="w-[100px]">Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        {configResponse?.verified?.type ?? "TXT"}
                      </TableCell>
                      <TableCell>
                        {configResponse?.verified?.domain ?? "_vercel"}
                      </TableCell>
                      <TableCell>
                        {configResponse?.verified?.value ?? ""}
                      </TableCell>
                      {/* <TableCell className="text-right">$250.00</TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </>
          )}

          <SignOut />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-20 py-4  md:hidden">
        <div className="mx-auto flex w-[90%] items-center justify-between rounded-full border bg-black px-3 py-1">
          <Link href="/">
            <HomeIcon className="h-8 w-8 text-white" />
          </Link>
          <div className="h-full self-stretch rounded-full bg-white p-2 text-black">
            <MdAccountCircle className="h-10 w-10 " />
          </div>
          <Link href={`/c/${session?.user?.id}/profile`}>
            <Video className="text-w h-8  w-8 rounded-full" />
          </Link>
        </div>
      </div>
    </div>
  );
}


