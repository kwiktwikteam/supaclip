import React from 'react'
import { type TranscriptProps } from '~/app/c/[creatorId]/vid/[vidId]/page';




const Transcript = ({ transcripts, loading }: { transcripts: TranscriptProps[], loading: boolean }) => {

  // console.log(loading, transcripts);


  return (
    <div className="transcript relative  overflow-y-scroll md:space-y-5">
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
        {loading && transcripts.length === 0  && (
          <div className="z-50 grid h-full w-full place-content-center bg-black">
            <div
              className={`h-[50px] w-[50px] animate-spin rounded-full border-t-4 border-gray-200 `}
            ></div>
          </div>
        )}
        {transcripts.length === 0 && !loading && (
          <div className="py-2">No transcript available for this video</div>
        )}
        {transcripts.map((item: TranscriptProps, index: number) => {
          return (
            <div key={index} className="flex flex-wrap pb-2 my-4 items-center border-b border-gray-700 ">
              {/* 00:00 - - alksdjflask;jdf */}
              <div className="flex flex-col md:flex-row gap-2 md:items-center">
                <div className="text-nowrap md:text-md font-mono text-sm font-bold">
                  {formatTime(parseFloat(item.offset))}-
                  {formatTime(
                    parseFloat(item.offset.toString()) +
                      parseFloat(item.duration.toString()),
                  )}
                  :{" "}
                </div>

                <div className="text-md leading-relaxed tracking-wider text-white/80">
                  {item.transcriptText}
                </div>
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
