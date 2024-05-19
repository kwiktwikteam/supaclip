"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"
import { env } from "~/env";

// const apiKey = process.env.! ;

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

const prompt =
  "Analyze this paragraph which is a transcript of a video. Answer user questions based solely on the provided text, avoiding external knowledge. Given Transcript:";


export const textTotext =async (inp: string, para: string) =>{
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  let text, result, response;
  if(para) {
    const finalPrompt = prompt + para.slice(0,2500) + "Based on only this answer the following user input: " + inp;
    // console.log("Para", para)
    result = await model.generateContent(finalPrompt);
    response =result.response;
    text = response.text();
  } else {
    result = await model.generateContent("Analyze the question and give a simplified ans. The question is: " + inp);
    response =result.response;
    text = result.response.text();
  }
//   setresponse(text);
  return text
}