import { HomeIcon, Video } from "lucide-react";
import Image from "next/legacy/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import { auth, signOut } from "~/auth";
import { Input } from "~/components/ui/input";

export default async function page({
  params,
}: {
  params: {
    creatorId: string;
  };
}) {
  const session = await auth();
    // console.log(session)
  if (!session) {
    return redirect("/api/auth/signin?callbackUrl=" + "/c/" + params.creatorId );
  }

  return (
    <div className="flex h-screen w-screen justify-center overflow-hidden  bg-black pt-12 text-white">
      <div className="w-full space-y-20">
        {/* profile image */}
        <div className="profileimage text-center">
          <Image
            src={session.user.image}
            alt={session.user?.name}
            width={150}
            height={150}
            className="mx-auto h-16 w-16 rounded-full"
          />
          <p className="font-semibold">{session.user?.name}</p>
        </div>

        {/* user info */}
        <div className="mx-auto w-[90%] space-y-8">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={session.user.name}
              disabled={true}
              className="rounded-lg border bg-white/20 p-3"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="email" className="text-xl font-semibold">
                Email 
            </label>
            <input
              type="text"
              name="email"
              value={session.user.email}
              disabled={true}
              className="rounded-lg border bg-white/20 p-3"
            />
          </div>

          <SignOut />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20 py-4  md:hidden">
        <div className="mx-auto flex w-[90%] items-center justify-between rounded-full border bg-black px-3 py-1">
          <Link href="/">
            <HomeIcon className="h-8 w-8 text-white" />
          </Link>
          <div
            className="h-full self-stretch rounded-full bg-white p-2 text-black"
          >
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


export function SignOut() {
  return (
    <form
      className="flex  w-full items-center justify-center"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="mx-auto w-full rounded-full border-2 border-red-600 px-4 py-3 text-red-600"
      >
        Log out
      </button>
    </form>
  );
}