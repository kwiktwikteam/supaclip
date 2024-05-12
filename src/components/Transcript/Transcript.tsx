import React, { useState } from 'react'
import { type TranscriptProps } from '~/app/(template)/video/[id]/page';
import { BiSolidShareAlt } from "react-icons/bi";




const Transcript = ({ transcripts }: { transcripts: TranscriptProps[] }) => {

  const values = {
    transcript: {
      title: "Transcript",
    }, 
    summary: {
      title: "Summary"
    }
  }
  const [value, setValue] = useState("transcript")


  return (
    <div className="transcript overflow-y-scroll max-h-[400px] space-y-5">
      {/* <div className="flex-center-between">
        <h2 className="cursor-pointer text-xl font-semibold lg:text-2xl">
          Transcript
        </h2>
        <div className='flex items-center gap-5'>
          <BiSolidShareAlt className='text-xl cursor-pointer'/>
          <h2 className="text-md cursor-pointer font-semibold opacity-50 lg:text-lg">
            Resources
          </h2>
        </div>
      </div> */}
      <div className="pb-5 text-xl leading-10">
        {
          transcripts.length === 0 && (
            <div className='w-[50px] h-[50px] rounded-full bg-black border-t-2 animate-spin'>

            </div>
          )
        }
        {transcripts.map((item: TranscriptProps, index: number) => {
          return (
            <div key={index} className="flex items-center flex-wrap gap-4 md:gap-8">
              {/* 00:00 - - alksdjflask;jdf */}
              <div className="text-sm md:text-md font-mono font-bold">
                {formatTime(parseFloat(item.offset))} -{" "}
                {formatTime(
                  parseFloat(item.offset.toString()) +
                    parseFloat(item.duration.toString()),
                )}
                :{" "}
              </div>

              <div className="leading-relaxed tracking-wider text-white/80">
                {item.transcriptText}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}
export default Transcript
