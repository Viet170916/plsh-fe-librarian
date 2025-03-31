"use client";
import { useLazyGetEpubResourceQuery } from "@/stores/slices/api/resource.static.slice";
import { Button, Container, Slider } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Reader(){
				const [ text, setText ] = useState<string>( "" );
				const [ highlightedIndex, setHighlightedIndex ] = useState<number>( 0 );
				const [ audio, setAudio ] = useState<HTMLAudioElement | null>( null );
				const [ isPlaying, setIsPlaying ] = useState<boolean>( false );
				const [ volume, setVolume ] = useState<number>( 1 );
				const textRef = useRef<HTMLDivElement | null>( null );
				const [ getText, { data: textData, isLoading: textLoading, error: textError } ] = useLazyGetEpubResourceQuery();
				const generateAudio = useCallback( async function( text: string ){
								const response = await fetch( "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyAHcIVuLdQBxrbf1pa-rQVcqBmFPY7j25E", {
												method: "POST",
												headers: {
																"Content-Type": "application/json",
												},
												body: JSON.stringify( {
																input: { text },
																voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
																audioConfig: { audioEncoding: "MP3" },
												} ),
								} );
								const data = await response.json();
								const newAudio = new Audio( `data:audio/mp3;base64,${ data.audioContent }` );
								newAudio.volume = volume;
								newAudio.onended = () => setIsPlaying( false );
								setAudio( newAudio );
				}, [ volume ] );
				useEffect( () => {
								getText( { bookId: 2, chapter: 4 } );
				}, [ getText ] );
				useEffect( () => {
								if( textData ){
												generateAudio( textData );
								}
				}, [ textData, generateAudio ] );
				function togglePlay(){
								if( !audio ) return;
								if( isPlaying ){
												audio.pause();
								}else{
												audio.play();
								}
								setIsPlaying( !isPlaying );
				}
				function changeVolume( event: Event, newValue: number | number[] ){
								if( typeof newValue === "number" ){
												setVolume( newValue );
												if( audio ){
																audio.volume = newValue;
												}
								}
				}
				function seekToWord( index: number ){
								setHighlightedIndex( index );
								// Logic tua audio đến đúng đoạn này
				}
				return (
								<Container maxWidth = "md" sx = { { textAlign: "center", mt: 4 } }>
												<div
																ref = { textRef }
																style = { {
																				height: "50vh",
																				overflowY: "auto",
																				fontSize: "18px",
																				lineHeight: "1.5",
																} }
												>
																{ text.split( " " ).map( ( word, index ) => (
																				<span
																								key = { index }
																								onClick = { () => seekToWord( index ) }
																								style = { {
																												backgroundColor: index === highlightedIndex ? "yellow" : "transparent",
																												cursor: "pointer",
																								} }
																				>
            { word }
          </span>
																) ) }
												</div>
												<div>
																<Button onClick = { togglePlay }>{ isPlaying ? "Pause" : "Play" }</Button>
																<Slider value = { volume } onChange = { changeVolume } min = { 0 } max = { 1 } step = { 0.1 } />
												</div>
								</Container>
				);
}
