
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
import { getOrCreateProfile } from "~/lib/helpers/profile";

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
  return (
    <div className="relative mx-auto flex h-screen w-screen max-w-md justify-center overflow-hidden overflow-x-hidden  bg-black/80 pt-12 text-white">
      {/* <Image src='/images/hero/bg.png' alt="bg" layout="fill" className="-z-10" />
      <Image src="/bg.png" alt="bg" layout="fill" className="-z-20 opacity-50" /> */}

      <div className="w-full space-y-20">
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
          <SignOut />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20 py-4  md:hidden">
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


