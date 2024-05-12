import { eq } from "drizzle-orm";
import { Share, Share2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CgAdd } from "react-icons/cg";
import { MdAccountCircle } from "react-icons/md";
import { auth } from "~/auth";
import VidGallery from "~/components/Gallery/VidGallery";
import Button from "~/components/ui/Button";
import { getUser } from "~/lib/helpers/transcript";
import { db } from "~/server/db";
import { transcriptions } from "~/server/db/schema";

export default async function Page({
  params,
}: {
  params: {
    creatorId: string;
  };
}) {
  // channel of creator
  const user = await getUser(params.creatorId);
 
  if(!user) {
    return redirect("/")
  }
  const session = await auth();
  // const { toast } = useToast();



  // console.log(user)
  const allVids = await db
    .select()
    .from(transcriptions)
    .where(eq(transcriptions.userId, params.creatorId));
  return (
    <main className="min-h-screen bg-black py-5">
      <div className="mx-auto w-[90%] max-w-6xl space-y-4 pt-5">
        <div className="flex items-center justify-between rounded-md border-b-2 pb-4">
          {/* Creator Profile */}
          <div className="flex items-center gap-4 ">
            <div>
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Creator Image"
                  width={75}
                  height={75}
                  className="rounded-full"
                />
              ) : (
                <MdAccountCircle className="text-6xl text-white" />
              )}
            </div>
            <div className="text-white">
              <h1>{user.name}</h1>
              {/* <p>{user.}</p> */}
            </div>
          </div>

          {/* button */}
          <div className="flex items-center gap-4 ">
            {session?.userId == params.creatorId ? (
              <Link href="/generate">
                <Button className="space-x-2 bg-white text-black">
                  <CgAdd className="text-xl" />
                  <span>Add Video</span>
                </Button>
              </Link>
            ) : null}
            {/* <Share2Icon className="text-white"  /> */}
          </div>
        </div>
        <VidGallery
          videos={allVids}
          creator={params.creatorId}
          className="xl:grid-cols-4"
        />
      </div>
    </main>
  );
}