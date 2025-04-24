import appStrings from "@/helpers/appStrings";
import {color} from "@/helpers/resources";
import {Box, Paper, Slider, Typography} from '@mui/material';
import Grid from "@mui/material/Grid2";
import ePub, {Book, Rendition} from 'epubjs';
import Section from "epubjs/types/section";
import Spine from "epubjs/types/spine";
import React, {useEffect, useRef, useState} from 'react';
import AppPagination from "@/components/primary/Input/AppPagination";
import NeumorphicButton from "@/components/primary/neumorphic/Button";

type EpubReaderProps = {
    file: File | null;
};
const EpubReader: React.FC<EpubReaderProps> = ({file}) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);
    const [book, setBook] = useState<Book | null>(null);
    const [rendition, setRendition] = useState<Rendition | null>(null);
    const [textContent, setTextContent] = useState<string>('');
    const [currentChapter, setCurrentChapter] = useState<number>(1);
    const [totalChapters, setTotalChapters] = useState<number>(1);
    useEffect(() => {
        if (!file || initialized.current) return;
        initialized.current = true;
        const reader = new FileReader();
        reader.onload = (event) => {
            if (!event.target?.result) return;
            const bookInstance = ePub(event.target.result as ArrayBuffer);
            setBook(bookInstance);
            const renditionInstance = bookInstance.renderTo(viewerRef.current!, {
                width: '100%',
                height: '100%',
            });
            setRendition(renditionInstance);
            renditionInstance.display().then(() => {
                bookInstance.ready.then(() => {
                    setTotalChapters((bookInstance.spine as Spine & { length: number }).length || 1);
                });
            });
            renditionInstance.on("rendered", (section: Section) => {
                setCurrentChapter((section.index ?? 0) + 1);
                setTimeout(() => {
                    const iframe = viewerRef.current?.querySelector('iframe');
                    if (iframe) {
                        iframe.removeAttribute('sandbox');
                        iframe.setAttribute('allow', 'allow-scripts allow-same-origin allow-modals');
                    }
                }, 500);
            });
        };
        reader.readAsArrayBuffer(file);
    }, [file]);
    const goToPreviousPage = () => {
        if (rendition) rendition.prev();
    };
    const goToNextPage = () => {
        if (rendition) rendition.next();
    };
    const handlePageChange = (value: number) => {
        if (book && rendition) {
            const section = book.spine.get(value - 1);
            if (section) rendition.display(section.href);
        }
    };
    return (
        <Grid direction={"column"} container sx={{padding: 2}} width={"100%"} height={"calc(100% - 20px)"}>
            <Typography sx={{color: color.DARK_TEXT}} variant="h4" textAlign={"start"}>
                {appStrings.book.E_BOOK_PREVIEW}
            </Typography>
            <Grid size={"grow"}>
                <Paper sx={{width: '100%', height: "100%", borderColor: color.WHITE}}>
                    <Box ref={viewerRef} sx={{width: '100%', height: '100%'}}/>
                </Paper>
            </Grid>
            <Grid sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2}}>
                <NeumorphicButton variant="outlined" onClick={goToPreviousPage} disabled={currentChapter === 1}>
                    Previous Page
                </NeumorphicButton>
                <Slider
                    value={currentChapter}
                    min={1}
                    max={totalChapters}
                    onChange={(_, value) => handlePageChange(value as number)}
                    aria-labelledby="continuous-slider"
                    sx={{width: '50%'}}
                />
                <NeumorphicButton variant="outlined" onClick={goToNextPage} disabled={currentChapter === totalChapters}>
                    Next Page
                </NeumorphicButton>
            </Grid>
            <AppPagination
                hideNavButton
                count={totalChapters}
                page={currentChapter}
                onChange={(_, value) => handlePageChange(value)}
                sx={{display: 'flex', justifyContent: 'center'}}/>

        </Grid>
    );
};
export default EpubReader;
