import {NextResponse} from "next/server";
import axios from "axios";
import {createWriteStream} from "fs";
import path from "path";

interface TextRequestBody {
    text: string;
}
export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const text = url.searchParams.get("text");
        if (!text) {
            return NextResponse.json({ message: "Text is required" }, { status: 400 });
        }
        const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY??"sk_a30bcb92974dfd51278c6dad852a552c3e03a9536a6a3399";
        if (!ELEVENLABS_API_KEY) {
            return NextResponse.json({ message: "API key is missing" }, { status: 500 });
        }
        const response = await axios.post(
            "https://api.elevenlabs.io/v1/text-to-speech",
            {
                text,
                voice: "9BWtsMINqrJLrRacOk9x",
                model_id: "eleven_flash_v2_5",
                output_format: "mp3_44100_128",
            },
            {
                headers: {
                    "Authorization": `Bearer ${ELEVENLABS_API_KEY}`,
                    "Content-Type": "application/json",
                },
                responseType: "stream",
            }
        );
        return new NextResponse(response.data, {
            headers: {
                "Content-Type": "audio/mp3",
                "Content-Disposition": "inline",
            },
        });
    } catch (error) {
        console.error("Error with Eleven Labs TTS API", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}



// import {NextResponse} from "next/server";
// import OpenAI from "openai";
// import axios from "axios";
//
//
// const openai = new OpenAI({
//     apiKey:"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"
//     // apiKey: "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"
//     // apiKey: "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",
//     // apiKey: "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"
// });
//
//
// export async function GET() {
//     try {
//
//         const response = await axios({
//             method: 'POST',
//             url: 'https://vbee.vn/api/v1/tts',
//             data: {voice_code: 'hn_female_ngochuyen_full_48k-fhg', speed_rate: '1.0', input_text: 'Nhập văn bản vào ô dưới này, sau đó lựa chọn ngôn ngữ và giọng đọc để bắt đầu cho công cụ đọc văn bản Tiếng Việt.',
//                 // app_id: appId,
//                 // callback_url: callbackUrl
//             },
//             headers: {
//                 // Authorization: 'Bearer ' + token,
//             },
//             timeout: 120000,
//         });
//         return NextResponse.json(response);
//         // const mp3 = await openai.audio.speech.create({
//         //     model: "tts-1",
//         //     voice: "alloy",
//         //     input: "Today is a wonderful day to build something people love!",
//         // });
//         //
//         // const buffer = Buffer.from(await mp3.arrayBuffer());
//         //
//         // return new NextResponse(buffer, {
//         //     headers: {
//         //         "Content-Type": "audio/mpeg",
//         //         "Content-Disposition": 'attachment; filename="speech.mp3"',
//         //     },
//         // });
//     } catch (error) {
//         console.error("Speech API error:", error);
//         return NextResponse.json({error: "Failed to generate speech"}, {status: 500});
//     }
// }
