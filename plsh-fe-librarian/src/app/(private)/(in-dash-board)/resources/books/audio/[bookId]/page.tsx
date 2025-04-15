import React from "react";
import Grid from "@mui/material/Grid2";
import Paging from "@/app/(private)/(in-dash-board)/resources/books/audio/[bookId]/Paging";
import Player from "@/app/(private)/(in-dash-board)/resources/books/audio/[bookId]/Player";

type pageProps = {
    params: Promise<{ bookId: number }>
}

const AudioBookPage = async ({params}: pageProps) => {
    const {bookId} = await params;
    return (
        <Grid>
            <Player/>
            <Paging bookId={bookId}/>
        </Grid>
    );
};

// async function page( { params }: pageProps ){
// 				const { bookId } = await params;
// 				return (
// 								<Grid>
// 												<Reader />
// 								</Grid>
// 				);
// }
export default AudioBookPage;

