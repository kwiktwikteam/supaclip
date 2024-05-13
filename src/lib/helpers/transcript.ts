/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'


import { eq } from "drizzle-orm";
import { YoutubeTranscript } from "youtube-transcript";
import { db } from "~/server/db";
import { transcriptRows, transcriptions, users } from "~/server/db/schema";
import getVideoId from 'get-video-id';

export const fetchVideoId = async(url: string) => {
  const { id } = await getVideoId(url)
  console.log(id)
  return id;
}


// fetch transcription rows from database
 export const fetchTranscriptionRows = async (id: string, creator: string) => {
    const transcript = await db
      .select()
      .from(transcriptRows)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .where(eq(transcriptRows.videoId, id));
    
      const res = await db
      .select({
        userId: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
        videoId: transcriptions.videoId,
        title: transcriptions.title,
        rows: {
          id: transcriptRows.id,
          transcriptText: transcriptRows.transcriptText,
          duration: transcriptRows.duration,
          offset: transcriptRows.offset,
        }
      })
      .from(transcriptions)
      .fullJoin(transcriptRows, eq(transcriptions.videoId, transcriptRows.videoId))
      .fullJoin(users, eq(transcriptions.userId, users.id))

      // console.log(res)
    // setres(transcript);
    // console.log(transcript)
    return transcript;
  }

export const fetchTranscript = async (id: string) => {
    const res = await YoutubeTranscript.fetchTranscript(id);
    // console.log(res[1])
    // const json = await res.json();
    // console.log(json)
    return res
}

export const fetchMetaData = async(id: string): Promise<
  {
    title: string;
    author_name: string;
    provider_name: string;
    thumbnail_url: string;
  }
> => {
  const url = 'https://www.youtube.com/watch?v=' + id; // Example YouTube video URL
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const fetchUrl = `https://youtube.com/oembed?url=${url}&format=json`
  const data = await fetch(fetchUrl)

  const res = await data.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res;
} 


export const getUser = async (id: string) => {
  const res = await db
  .select()
  .from(users)
  .where(eq(users.id, id));
  return res[0];
}


export const fetchVideoTranscrptDB = async (id: string) => {
  const res = await db
  .select()
  .from(transcriptions)
  .where(eq(transcriptions.videoId, id));

  
  return res[0];
}

export default fetchTranscript;