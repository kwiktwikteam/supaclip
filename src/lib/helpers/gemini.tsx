"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { env } from "~/env";

// const apiKey = process.env.! ;

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const prompt =
  "Analyze this paragraph which is a transcript of a video. Answer user questions based solely on the provided text, avoiding external knowledge. Given Transcript:";


export const textTotext =async (inp: string, para: string) =>{
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const finalPrompt = prompt + para + "Based on only this answer the following user input: " + inp;
  // console.log("Para", para)
  const result = await model.generateContent(finalPrompt);
  const response =result.response;
  const text: string = response.text();

//   setresponse(text);
  return text
}