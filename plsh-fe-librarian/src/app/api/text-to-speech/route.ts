import {NextResponse} from "next/server";
import OpenAI from "openai";
import axios from "axios";


const openai = new OpenAI({
    apiKey:"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"
    // apiKey: "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"
    // apiKey: "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",
    // apiKey: "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"
});


export async function GET() {
    try {

        const response = await axios({
            method: 'POST',
            url: 'https://vbee.vn/api/v1/tts',
            data: {voice_code: 'hn_female_ngochuyen_full_48k-fhg', speed_rate: '1.0', input_text: 'Nhập văn bản vào ô dưới này, sau đó lựa chọn ngôn ngữ và giọng đọc để bắt đầu cho công cụ đọc văn bản Tiếng Việt.',
                // app_id: appId,
                // callback_url: callbackUrl
            },
            headers: {
                // Authorization: 'Bearer ' + token,
            },
            timeout: 120000,
        });
        return NextResponse.json(response);
        // const mp3 = await openai.audio.speech.create({
        //     model: "tts-1",
        //     voice: "alloy",
        //     input: "Today is a wonderful day to build something people love!",
        // });
        //
        // const buffer = Buffer.from(await mp3.arrayBuffer());
        //
        // return new NextResponse(buffer, {
        //     headers: {
        //         "Content-Type": "audio/mpeg",
        //         "Content-Disposition": 'attachment; filename="speech.mp3"',
        //     },
        // });
    } catch (error) {
        console.error("Speech API error:", error);
        return NextResponse.json({error: "Failed to generate speech"}, {status: 500});
    }
}
