"use client";

import { useRouter } from "next/navigation";
import React, {useState, useEffect } from "react";
import Button from "~/components/ui/Button";
// import { getVideoId } from "~/lib/helpers/other";
import Image from "next/image";
import { useToast } from "~/components/ui/use-toast";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchVideoId } from "~/lib/helpers/transcript";

const Page = () => {
  const router = useRouter();
  const [videoUrl, setvideoUrl] = useState("");
  const [vidId, setvidId] = useState("")
  const { toast } = useToast();

  const searchParams = useSearchParams();

  const handleSubmit = async () => {
    // router 
    if(!videoUrl){
      // TODO : TOAST ENTER VALID VIDEO URL OR ID
      toast({
        title: "Please Enter a Valid Video URL or ID"
      });
      return;
    } 
    if(videoUrl.length > 11){
      const id = await fetchVideoId(videoUrl);
      if(!id){
        toast({
          title: "Please Enter a Valid Video URL or ID"
        });
        setvideoUrl("")
        return;
      } 
      setvidId(id);
    } else {
      setvidId(videoUrl);
    }

    toast({
      title: "Generating SupaClip Page",
      description: "Please wait while we generate webpage for your video. If nothing happens for 5-10 seconds please press again.",
    })


    // console.log(set)
    
    router.push("/generate/" + vidId);
  }


  useEffect(() => {
    const q = searchParams.get("q");

    if(q) {
      setvideoUrl(q);
    }
  }, [])


  return (
    <div className="relative grid h-screen place-content-center gap-12 bg-black">
      {/* <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-50"> */}
      {/* </div> */}
      <Image
        src={"/hero_bg.png"}
        alt="hero"
        fill
        priority
        className="absolute z-10 h-full w-full opacity-30"
      />
      <Image
        src={"/images/hero/bg.png"}
        alt="hero"
        fill
        className="absolute z-10 h-full w-full opacity-50"
      />
      {/* <VidGallery
        videos={themeVideos}
        className="z-20 gap-x-32"
        hideDetails={true}
      /> */}
      <div className="absolute left-1/2 right-1/2 top-5 z-10 flex w-[90%] -translate-x-1/2 items-center justify-between px-5 *:text-4xl *:text-white md:w-3/4">
        <Link href="/" className="border-2 rounded-full p-2">
          <HomeIcon />
        </Link>
      </div>
      <div className="flex-col-center-center z-10 gap-5">
        <input
          type="text"
          placeholder="YouTube Video Id"
          value={videoUrl}
          className="w-[450px] rounded-full px-4 py-3"
          onChange={(e) => setvideoUrl(e.target.value)}
        />
        <Button className="bg-white" onClick={handleSubmit}>
          {/* <Button className='bg-white'  onClick={handleSubmit}> */}
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Page;
