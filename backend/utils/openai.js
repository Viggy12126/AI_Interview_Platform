import fs from "fs";
import path from "path";
import OpenAI from "openai";
import {config} from 'dotenv';

config({
  path:'./config/config.env',
});

const openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});

const speechFile = path.resolve("./speech.mp3");

// export const convert=async (text)=>{

//   console.log(process.env.OPENAI_API_KEY);

//     const mp3 = await openai.audio.speech.create({
//         model: "tts-1",
//         voice: "alloy",
//         input: text,
//       });
//       // console.log(speechFile);
//       const buffer = Buffer.from(await mp3.arrayBuffer());
//       await fs.promises.writeFile(speechFile, buffer);
//       return buffer;
// }

export const feedback=async (answer,question)=>{

  
  let prompt = `Consider your self as a interviewer. This is question :- ${question} and this is my answer of this question :- ${answer}. Give me feedback on this answer. Also, give the rating on the scale from 0-10. Don't mention any where that you are an AI model and don't give any sample answers. Just give feedback and return in JSON format`;
  const response = await openai.chat.completions.create({
    model : "gpt-3.5-turbo-1106",
    response_format : { "type": "json_object" },
    messages : [
        { role: 'user', content: prompt }
    ]
}, {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    }
});

if (!response || !response.choices || response.choices.length === 0) {
  throw new Error('Invalid response from OpenAI API');
}

const generatedText = response.choices[0].message.content.trim();
const parsedData = JSON.parse(generatedText);
return parsedData;

}

// module.exports={convert}