"use client";
import EpubReader from "@/app/(private)/(in-dash-board)/resources/books/e-book/EpubReader";
import TextToSpeech from "@/app/(private)/(in-dash-board)/resources/books/e-book/TextToSpeech";
import React, { useState } from "react";

const EpubPage = () => {
  const [ selectedText, setSelectedText ] = useState<string>( '' );
  const handleTextSelection = ( text: string ) => {
    setSelectedText( text );
  };
  return (
    <div>
      <EpubReader/>
      {/*{ selectedText && <TextToSpeech text = { selectedText } /> }*/}
    </div>
  );
};
export default EpubPage;
