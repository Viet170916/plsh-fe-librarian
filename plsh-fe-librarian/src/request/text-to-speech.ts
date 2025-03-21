import axios from 'axios';

const fetchSpeech = async( text: string ) => {
  const apiKey = "AIzaSyAHcIVuLdQBxrbf1pa-rQVcqBmFPY7j25E";
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${ apiKey }`;
  const response = await axios.post( url, {
    input: { text },
    voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
    audioConfig: { audioEncoding: 'MP3' },
  } );
  return response.data.audioContent;
};
