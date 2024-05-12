import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const VidGallery = ({
  videos,
  className="",
  hideDetails = false,
  creator=""
}: {
  videos: {
    id: number | string | undefined;
    title: string | undefined;
    thumbnail: string | undefined;
    channelTitle: string | undefined;
    videoId: string | undefined;
  }[];
  className?: string;
  hideDetails?: boolean;
  creator?: string;
}) => {
  const blankImageUrl =
    "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";

  return (
    <div
      className={`grid overflow-x-hidden  w-full grid-cols-1 gap-8 overflow-scroll sm:grid-cols-2 md:grid-cols-3 lg:max-h-[80vh] lg:grid-cols-3 ${className}`}
    >
      {videos.map(
        (video, index) => (
          <VideoCard
            key={index}
            video={video}
            hideDetails={hideDetails}
            creator={creator}
          />
        ),
      )}
    </div>
  );
};


const VideoCard = ({
  video,
  hideDetails=false,
  creator=""
}: {
  video: {
    id: number | string | undefined;
    title: string | undefined;
    thumbnail: string | undefined;
    channelTitle: string | undefined;
    videoId?: string | undefined;
  };
  hideDetails?: boolean;
    creator?: string;
}) => {
  const blankImageUrl =
    "https://cdn.britannica.com/16/254816-050-41C9577A/Google-logo-Googleplex-headquarters-Mountain-View-California.jpg";

  return (
    <Link
      href={`/c/${creator}/vid/${video.videoId}`}
      className="relative  flex w-full cursor-pointer flex-col justify-center  gap-2 rounded-xl bg-gray-200 bg-transparent duration-300 hover:scale-105"
    >
      {video.thumbnail ? (
        <Image
          src={video.thumbnail}
          alt={video.title ?? "na"}
          width={240}
          height={200}
          className={`w-full rounded-t-xl object-cover ${hideDetails ? "h-[130px] w-[240px]" : ""}`}
        />
      ) : (
        <Image
          src={blankImageUrl}
          alt={video.title ?? "na"}
          width={240}
          height={200}
          className={`w-full rounded-t-xl ${hideDetails ? "h-[130px] w-[240px]" : ""}`}
        />
      )}
      <div className={`text-white ${hideDetails ? "" : ""}`}>
        <h3 className="flex max-w-[250px] flex-wrap font-bold">
          {video.title?.toString().slice(0, 50) ?? "Video Title"}
        </h3>
        <p className="text-white/60">@{video.channelTitle ?? "Video Title"}</p>
      </div>
    </Link>
  );
};


export default VidGallery
