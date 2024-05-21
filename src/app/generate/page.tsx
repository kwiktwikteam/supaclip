"use client";

import React, {useState, useEffect } from "react";
import Button from "~/components/ui/Button";
// import { getVideoId } from "~/lib/helpers/other";
import Image from "next/image";
import { useToast } from "~/components/ui/use-toast";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchMetaData, fetchVideoId } from "~/lib/helpers/transcript";



const Page = () => {
  const [videoUrl, setvideoUrl] = useState("");
  const [vidId, setvidId] = useState("")
  const { toast } = useToast();


  const [metaData, setmetaData] = useState({
    title: "",
    author_name: "",
    provider_name: "",
    thumbnail_url: ""
  })


  const getVideoData = async() => {
    try {
      if (!videoUrl) {
        toast({
          title: "Please Enter a Valid Video URL or ID",
        });

        return;
      }
      const id = await fetchVideoId(videoUrl);

      if (!id && videoUrl.length != 11) {
        toast({
          title: "Some error occured, please try again.",
        });
        return;
      }

      if(id) {
        setvidId(id);
        const data = await fetchMetaData(id);
        // console.log(data);
        setmetaData(data);
      } else if (videoUrl.length == 11){ 
        setvidId(videoUrl);
        const data = await fetchMetaData(videoUrl);
        // console.log(data);
        setmetaData(data);
      }
    } catch (error: any) {
      setvideoUrl("")
      toast({
        title: "Something went wrong",
        description: "Please try again. ",
      })
    }
  }

  return (
    <>
      <div className="relative grid h-screen place-content-center gap-12 bg-black">
        {/* <div className="absolute left-0 top-0 h-screen w-screen bg-black opacity-50"> */}
        {/* </div> */}

        <SetUrlToSearch seturl={setvideoUrl} />
        <Image
          src={"/bg.png"}
          alt="hero"
          fill
          priority
          className="absolute z-10 h-full w-full opacity-30 "
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
          <Link href="/" className="rounded-full border-2 p-2">
            <HomeIcon />
          </Link>
        </div>
        <div className="flex-col-center-center z-10 gap-5 max-md:w-screen">
          <input
            type="text"
            placeholder="YouTube Video Id"
            value={videoUrl}
            className="w-[90%] rounded-full px-4 py-3 md:w-[450px]"
            onChange={async (e) => {
              setvideoUrl(e.target.value);
            }}
          />

          <Button
            disabled={vidId ? true : false}
            onClick={getVideoData}
            className="bg-white"
          >
            Get Video
          </Button>
        </div>
      </div>

      {vidId && metaData.thumbnail_url && (
        <div className="absolute bottom-0 left-0 right-0 top-0 z-50 grid place-content-center backdrop-blur-md">
          <div className="mx-auto w-[90%] max-w-6xl rounded-xl bg-white p-5 sm:w-[60%]">
            <div className="flex flex-col gap-5 md:flex-row">
              <div className="md:w-2/3">
                <Image
                  src={metaData.thumbnail_url}
                  alt="thumbnail"
                  width={450}
                  height={450}
                  className="h-full w-full rounded-xl"
                />
              </div>
              <div className="flex flex-col items-stretch md:w-2/3">
                <div className="flex-1 space-y-4 pb-8">
                  <h1 className="text-xl font-bold md:text-3xl ">
                    {metaData.title}
                  </h1>
                  <p className="text-md font-bold text-gray-500">
                    @{metaData.author_name}
                  </p>
                  <p className="text-md text-wrap text-gray-500">
                    If this is the right video hit the <b>Generate</b> button to
                    continue, otherwise try with another url.
                  </p>
                </div>
                {/* <Link href={`/generate/${vidId}`}> */}
                  <Button onClick={() => {
                    window.location.pathname = "/generate/" + vidId;  
                  }} className="bg-black text-white">Generate</Button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const SetUrlToSearch = ({ seturl } : {
  seturl : (url: string) => void
}) => {
  const searchParams = useSearchParams();
  useEffect(() => {
    const q = searchParams.get("q");

    if (q) {
      seturl(q);
    }
  }, []);
  return (<></>)
}

export default Page;
