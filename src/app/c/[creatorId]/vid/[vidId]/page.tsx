"use client";

import { useCallback, useEffect, useState } from "react";
import { BiHome, BiQuestionMark, BiSolidShareAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Chat from "~/components/Chat/Chat";
import Transcript from "~/components/Transcript/Transcript";
// import { YoutubeTranscript } from "youtube-transcript";
import {
  fetchTranscriptionRows,
  fetchVideoTranscrptDB,
} from "~/lib/helpers/transcript";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Link from "next/link";

import { TiArrowBack } from "react-icons/ti";
import { useToast } from "~/components/ui/use-toast";

export interface TranscriptProps {
  videoId: string;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  transcriptText: string;
  duration: string;
  offset: string;
}

interface Transcription {
  id: number;
  title: string;
  videoId: string;
  summary: string | null;
}

const Page = () => {
  // const location
  const router = useRouter();
  
  
  const { toast } = useToast();
  const showToast = () => {
    toast({
      title: "Resources Availabe Soon",
      description: "We are working on making this feature available soon.",
    });
  }

  const copyToClipboard = async() => {
    const url = window.location.href;

    const res = await navigator.clipboard.writeText(url)

    toast({
      title: "Link Copied",
      description: "The link has been copied to your clipboard",
    })
  }


  const [showMobileChat, setshowMobileChat] = useState(false);
  const [res, setres] = useState<TranscriptProps[] | []>([]);
  const [vidId, setvidId] = useState("");
  const [para, setpara] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [transcript, settranscript] = useState<Transcription>({
    id: 0,
    title: "",
    videoId: "",
    summary: "" 
  })

   const fetchAll = useCallback(async (id: string, creator: string) => {
     
     const res = await fetchVideoTranscrptDB(id);
     if (res) {
       settranscript({
         id: res.id,
         title: res.title ?? "Video Sample Title",
         videoId: res.videoId,
         summary: res.summary,
       });
     } else {
       toast({
         title: "No Video Found",
         description: "The video you are looking for does not exist.",
       });
       return router.push("/generate?q=" + id);
     }

     setisLoading(true);
     const transcripts = await fetchTranscriptionRows(id, creator); // Await the result of the fetchTranscriptionRows function
     setres(transcripts);
     setisLoading(false);
     let text = "";
     transcripts.forEach((item) => {
       text += item.transcriptText;
     });

     setpara(text);
   }, [router, toast])

  useEffect(() => {
      const path: string = window.location.pathname;
      const parts: string[] = path.split("/");
      const lastPart = parts[parts.length - 1];

      setvidId(lastPart ?? "");
    
  }, [])


  useEffect(() => {
    const path: string = window.location.pathname;
    const parts: string[] = path.split("/");
    const lastPart = parts[parts.length - 1];

    setvidId(lastPart ?? "");

    // get the video id from the url

    fetchAll(lastPart ?? "", parts[4] ?? "").catch((err) => console.log(err));
  }, [fetchAll]);

  return (
    <div className="flex min-h-screen bg-black  text-white md:h-screen">
      <div className="video flex h-full w-full flex-col space-y-4  p-8 md:w-3/4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{transcript.title}</h2>
          <div className="flex gap-8">
            <div
              onClick={() => {
                const path: string = window.location.pathname;
                const parts: string[] = path.split("/vid");

                router.push(parts[0] ?? "/generate");
              }}
              className="cursor-pointer"
            >
              <TiArrowBack className="text-xl" />
            </div>
            <Link href="/">
              <BiHome className="text-xl" />
            </Link>
          </div>
        </div>
        
          <div className={`h-1/2 min-h-[50vh] w-full bg-white/20 ${!vidId && "animate-pulse"}`}>
            {vidId && (<iframe
              width="420"
              height="315"
              className="h-1/2 min-h-[50vh] w-full"
              src={`https://www.youtube.com/embed/${vidId}`}
            ></iframe>
          )}
          </div>
        {/* {vidId.length == 11 && <Transcript transcripts={res} />} */}

        <Tabs defaultValue="transcript" className="w-full overflow-x-clip">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-5">
              <BiSolidShareAlt
                className="cursor-pointer text-xl"
                onClick={copyToClipboard}
              />
              <h2
                onClick={showToast}
                className="text-md cursor-pointer font-semibold opacity-50 lg:text-lg"
              >
                Resources
              </h2>
            </div>
          </div>
          <TabsContent value="transcript">
            <Transcript transcripts={res} loading={isLoading} />
          </TabsContent>
          <TabsContent value="summary">
            {transcript.summary ?? "No summary available for this video."}
          </TabsContent>
        </Tabs>
      </div>

      <Chat
        showMobileChat={showMobileChat}
        setshowMobileChat={setshowMobileChat}
        transcripts={res}
      />

      {!showMobileChat && (
        <div
          onClick={() => setshowMobileChat(!showMobileChat)}
          className="flex-center fixed bottom-5 right-5 h-[67px] w-[67px] cursor-pointer rounded-full bg-white/90 md:hidden"
        >
          <BiQuestionMark className="animate-bounce text-4xl text-black" />
        </div>
      )}

      {/* <Toaster /> */}
    </div>
  );
};

export default Page;
