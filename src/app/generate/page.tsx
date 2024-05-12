"use client";

import { useRouter } from "next/navigation";
import React, {useState } from "react";
import VidGallery from "~/components/Gallery/VidGallery";
import Button from "~/components/ui/Button";
import { getVideoId } from "~/lib/helpers/other";
import themeVideos from "./data";
import Image from "next/image";
import { useToast } from "~/components/ui/use-toast";

const Page = () => {
  const router = useRouter();
  const [videoUrl, setvideoUrl] = useState("");
  const [vidId, setvidId] = useState("")
  const { toast } = useToast();
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
      const id = getVideoId(videoUrl);
      console.log(id)
      setvidId(id);
    } else {
      setvidId(videoUrl);
    }

    toast({
      title: "Generating SupaClip Page",
      description: "Please wait while we generate webpage for your video. If nothing happens for 5-10 seconds please press again.",
    })
    
    router.push("/generate/" + vidId);
  }




  return (
    <div className="relative grid h-screen place-content-center gap-12 bg-black">
      {/* <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-50"> */}
      {/* </div> */}
      <Image
        src={"/hero_bg.png"}
        alt="hero"
        fill
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
