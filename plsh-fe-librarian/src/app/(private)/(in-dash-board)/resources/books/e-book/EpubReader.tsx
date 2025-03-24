// pages/index.tsx
import ePub, { Book, Rendition } from 'epubjs';
import React, { useEffect, useRef, useState } from 'react';

const EpubReader: React.FC = () => {
  const viewerRef = useRef<HTMLDivElement>( null );
  const [ book, setBook ] = useState<Book | null>( null );
  const [ rendition, setRendition ] = useState<Rendition | null>( null );
  const [ textContent, setTextContent ] = useState<string>( '' );
  const [ highlightIndex, setHighlightIndex ] = useState<number>( 0 );
  useEffect( () => {
    const bookInstance = ePub( '' );
    setBook( bookInstance );
    const renditionInstance = bookInstance.renderTo( viewerRef.current!, {
      width: '100%',
      height: '80vh',
    } );
    setRendition( renditionInstance );
    renditionInstance.display().then();
    renditionInstance.on( 'rendered', () => {
      const iframe = viewerRef.current?.querySelector( 'iframe' );
      if( iframe && iframe.contentDocument ){
        const doc = iframe.contentDocument;
        const paragraphs = doc.querySelectorAll( 'p' );
        let content = '';
        paragraphs.forEach( ( p ) => {
          content += p.textContent + ' ';
        } );
        setTextContent( content );
      }
    } );
  }, [] );
  const handleReadAloud = () => {
    if( !textContent ) return;
    const utterance = new SpeechSynthesisUtterance( textContent );
    utterance.onboundary = ( event: SpeechSynthesisEvent ) => {
      if( event.name === 'word' ){
        const charIndex = event.charIndex;
        const words = textContent.split( ' ' );
        let accumulated = 0;
        let index = 0;
        for( let i = 0; i < words.length; i++ ){
          accumulated += words[i].length + 1; // cộng cả khoảng trắng
          if( accumulated > charIndex ){
            index = i;
            break;
          }
        }
        setHighlightIndex( index );
      }
    };
    window.speechSynthesis.speak( utterance );
  };
  return (
    <div style = { { padding: '20px' } }>
      <h1>EPUB Reader Demo</h1>
      <div
        ref = { viewerRef }
        style = { { width: '100%', height: '80vh', border: '1px solid #ccc', marginBottom: '20px' } }
      />
      <button onClick = { handleReadAloud } style = { { padding: '10px 20px', fontSize: '16px' } }>
        Read Aloud
      </button>
      {/* Hiển thị nội dung văn bản với highlight */ }
      { textContent && (
        <div style = { { marginTop: '20px' } }>
          <h3>Text Content (Highlight follows speech):</h3>
          <p style = { { fontSize: '18px', lineHeight: '1.6' } }>
            { textContent.split( ' ' ).map( ( word, idx ) => (
              <span
                key = { idx }
                style = { {
                  backgroundColor: idx === highlightIndex ? 'yellow' : 'transparent',
                } }
              >
                { word }{ ' ' }
              </span>
            ) ) }
          </p>
        </div>
      ) }
    </div>
  );
};
export default EpubReader;
