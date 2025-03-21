import { useEffect, useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = ( { text }: { text: string } ) => {
  const { speak, speaking, cancel } = useSpeechSynthesis();
  const [ words, setWords ] = useState<string[]>( [] );
  const [ highlightIndex, setHighlightIndex ] = useState<number>( -1 );
  useEffect( () => {
    setWords( text.split( ' ' ) );
  }, [ text ] );
  const handleSpeak = () => {
    let wordIndex = 0;
    const utterance = new SpeechSynthesisUtterance( text );
    utterance.onboundary = ( event ) => {
      if( event.name === 'word' ){
        setHighlightIndex( wordIndex );
        wordIndex += 1;
      }
    };
    speak( { text: utterance.text } );
  };
  return (
    <div>
      <p>
        { words.map( ( word, index ) => (
          <span
            key = { index }
            style = { {
              backgroundColor: index === highlightIndex ? 'yellow' : 'transparent',
            } }
          >
            { word }{ ' ' }
          </span>
        ) ) }
      </p>
      <button onClick = { handleSpeak } disabled = { speaking }>
        { speaking ? 'Speaking...' : 'Read Aloud' }
      </button>
      { speaking && <button onClick = { cancel }>Stop</button> }
    </div>
  );
};
export default TextToSpeech;
