"use client";
import PDFPreview from "@/components/primary/PDFPreview";
import appStrings from "@/helpers/appStrings";
import { Resource } from "@/helpers/appType";
import { color } from "@/helpers/resources";
import { CloudUpload, PictureAsPdf, Visibility } from "@mui/icons-material";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Box, Button, LinearProgress, Modal, Typography } from "@mui/material";
import React, { memo, useState } from "react";

interface IProps{
  children?: React.ReactNode;
  onUpload?: ( resource?: Resource ) => void;
}
const formatFileSize = ( size: number ) => {
  const units = [ "Bytes", "KB", "MB", "GB" ];
  let unitIndex = 0;
  while( size >= 1024 && unitIndex < units.length - 1 ){
    size /= 1024;
    unitIndex++;
  }
  return `${ size.toFixed( 2 ) } ${ units[unitIndex] }`;
};
function PdfUploader( props: IProps ){
  // switchScrollMode(ScrollMode.Wrapped);
  // const [resource, setResource] = useState<Resource | null>(null);
  const [ file, setFile ] = useState<File | null>( null );
  const [ fileURL, setFileURL ] = useState<string | null>( null );
  const [ progress, setProgress ] = useState<number>( 0 );
  const [ numPages, setNumPages ] = useState<number | null>( null );
  const [ pageNumber, setPageNumber ] = useState( 1 );
  const [ openPreview, setOpenPreview ] = useState( false );
  const handleFileUpload = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const uploadedFile = event.target.files?.[0];
    if( uploadedFile && uploadedFile.type === "application/pdf" ){
      props.onUpload?.( undefined );
      setFileURL( null );
      setFile( null );
      setProgress( 0 );
      const fakeUpload = setInterval( () => {
        setProgress( ( oldProgress ) => {
          if( oldProgress >= 100 ){
            clearInterval( fakeUpload );
            props.onUpload?.( {
                                file: uploadedFile,
                                localUrl: URL.createObjectURL( uploadedFile ),
                                name: uploadedFile.name,
                                type: "pdf",
                                fileType: uploadedFile.type,
                              } );
            setFileURL( URL.createObjectURL( uploadedFile ) );
            setFile( (uploadedFile) );
            return 100;
          }
          return oldProgress + 10;
        } );
      }, 300 );
    }else{
      alert( "Please upload a valid PDF file." );
    }
  };
  const handleLoadSuccess = ( { numPages }: { numPages: number } ) => {
    setNumPages( numPages );
  };
  const handleNextPages = () => {
    if( numPages && pageNumber + 2 <= numPages ){
      setPageNumber( pageNumber + 2 );
    }
  };
  const handlePrevPages = () => {
    if( pageNumber - 2 > 0 ){
      setPageNumber( pageNumber - 2 );
    }
  };
  console.log( fileURL );
  return (
    <Box sx = { { width: 400, p: 2, border: "1px solid #ccc", borderRadius: 2 } }>
      <input
        type = "file" accept = "application/pdf" onChange = { handleFileUpload } style = { { display: "none" } }
        id = "pdf-upload"
      />
      <label htmlFor = "pdf-upload">
        <Button variant = "contained" color = "primary" component = "span" startIcon = { <CloudUpload /> } fullWidth>
          Upload PDF
        </Button>
      </label>
      { progress > 0 && progress < 100 && (
        <Box sx = { { mt: 2 } }>
          <LinearProgress variant = "determinate" value = { progress } />
          <Typography variant = "body2" sx = { { textAlign: "center", mt: 1 } }>
            { progress }%
          </Typography>
        </Box>
      ) }
      { file && (
        <Box sx = { { mt: 2, display: "flex", alignItems: "center", gap: 1 } }>
          <PictureAsPdf color = "error" />
          <Typography variant = "body1">{ file.name }</Typography>
          <Typography variant = "body2" sx = { { ml: "auto", color: "gray" } }>
            { formatFileSize( file.size ) }
          </Typography>
        </Box>
      ) }
      { fileURL && (
        <Button
          variant = "outlined"
          color = "secondary"
          fullWidth
          startIcon = { <Visibility /> }
          sx = { { mt: 2 } }
          onClick = { () => setOpenPreview( true ) }
        >
          Preview PDF
        </Button>
      ) }
      <Modal
        open = { openPreview } onClose = { () => setOpenPreview( false ) }
        sx = { { display: "flex", alignItems: "center", justifyContent: "center", padding: 10 } }
      >
        <Box
          sx = { {
            bgcolor: color.WHITE,
            p: 3,
            borderRadius: 2,
            width: "100%",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            textAlign: "center",
          } }
        >
          <Typography variant = "h6">{ appStrings.PDF_PREVIEW }</Typography>
          <Box
            sx = { {
              display: "flex",
              justifyContent: "center",
              gap: 2,
              width: "80%",
              height: "100%",
              position: "relative",
            } }
          >
            <PDFPreview pdfUrl = { fileURL ?? "" } />
          </Box>
          {/*<Box sx={{display: "flex", justifyContent: "center", mt: 2}}>*/ }
          {/*    <IconButton onClick={handlePrevPages} disabled={pageNumber <= 1}>*/ }
          {/*        <NavigateBefore/>*/ }
          {/*    </IconButton>*/ }
          {/*    <Typography variant="body2" sx={{mx: 2}}>*/ }
          {/*        Page {pageNumber}/{numPages}*/ }
          {/*    </Typography>*/ }
          {/*    <IconButton onClick={handleNextPages}*/ }
          {/*                disabled={(numPages !== null && (pageNumber + 2 > numPages))}>*/ }
          {/*        <NavigateNext/>*/ }
          {/*    </IconButton>*/ }
          {/*</Box>*/ }
        </Box>
      </Modal>
    </Box>
  );
}
export default memo( PdfUploader );
