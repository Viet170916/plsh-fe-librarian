import {
    GRID_SIZE_HEIGHT,
    GRID_SIZE_WIDTH
} from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/row-component/config";
import ImageWithBgCover from "@/components/primary/ImageWithBgCover";
import appStrings from "@/helpers/appStrings";
import {BookInstance} from "@/helpers/appType";
import {color} from "@/helpers/resources";
import {useDraggable, useDroppable} from "@dnd-kit/core";
import {Box, Card, IconButton, Tooltip, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {motion} from "framer-motion";
import Link from "next/link";
import React, {memo} from "react";
import {NEUMORPHIC_SHADOW} from "@/style/theme/neumorphic.orange";
import {TbDragDrop} from "react-icons/tb";
import {useTheme} from "@mui/material/styles";
import {truncateTextStyle} from "@/style/text.style";

export const BookComponent = memo(({book}: { book: BookInstance }) => {
    // const [coverWidth, setCoverWidth] = useState<number>(0);
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: `${book.id}`});
    const style = {
        zIndex: 10,
        transform: transform ? `translate3d(${transform.x}px, 0, 0)` : "none",
        width: GRID_SIZE_WIDTH,
        height: GRID_SIZE_HEIGHT,
    };
    const theme = useTheme();
    return (
        <motion.div ref={setNodeRef} style={style}  {...attributes}>
            <Box
                onMouseEnter={() => {
                    // setCoverWidth(100)
                }}
                onMouseLeave={() => {
                    // setCoverWidth(0)
                }}
                sx={{
                    borderRadius: .2,
                    textAlign: "center",
                    height: GRID_SIZE_HEIGHT,
                    display: "flex",
                    alignItems: "center",
                    // bgcolor: theme.palette.grey[400],
                    justifyContent: "center",
                    position: "relative",
                    m: .3
                }}
            >
                <Tooltip
                    title={<Grid container spacing={1}>
                        <Grid size={"grow"} justifyContent={"center"} alignItems={"center"}>
                            <Link href={`/resources/books/${book.bookId}`}>
                                <Typography sx={{textDecoration: "underline", fontWeight: "bold"}}
                                            variant={"h6"}>{appStrings.book.NAME}: {book.bookName}</Typography>
                            </Link>
                            <Typography variant={"h6"}>{appStrings.book.CATEGORY}: {book.bookCategory}</Typography>
                            <Typography variant={"h6"}>{appStrings.book.VERSION}: {book.bookVersion}</Typography>
                            <Typography variant={"h6"}>{appStrings.book.CODE}: {book.code}</Typography>
                        </Grid>
                        <ImageWithBgCover sx={{width: 70, height: 100}} src={book.bookThumbnail ?? ""}/>
                    </Grid>}
                >
                    <Card
                        sx={{
                            display: "flex",
                            width: GRID_SIZE_WIDTH,
                            height: "90%",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: .4,

                            boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                            p: .5,
                            overflow: "hidden",
                            // backgroundImage: `url(${book.bookThumbnail ?? ""})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <Grid sx={{
                            m: .9,
                            backgroundColor: theme.palette.grey[100],
                            borderRadius: .2,
                            boxShadow: NEUMORPHIC_SHADOW.INNER_SHADOW(),
                            height: "70%",
                            overflow: "hidden",
                            // p: .5
                        }}>
                            <Typography
                                color={"textPrimary"}
                                sx={{
                                    transform: 'rotate(90deg)',
                                    // backgroundColor: theme.palette.background.default,
                                    // borderRadius: 1,
                                    // p: .3,
                                    textAlign: "center",
                                    justifySelf: "center",
                                    alignItems: "center",
                                    ...truncateTextStyle,
                                }}
                            >{book.bookName}</Typography>
                        </Grid>
                    </Card>
                </Tooltip>
                <IconButton
                    size={"small"}
                    sx={{
                        width: 25,
                        height: 25,
                        position: 'absolute',
                        transform: 'rotate(90deg)',
                        bgcolor: theme.palette.background.default,
                        boxShadow: NEUMORPHIC_SHADOW.SHADOW(),
                        right: -10, top: -10,
                        cursor: "grab"
                    }}  {...listeners}>
                    <TbDragDrop/>
                </IconButton>
                {/*<Box sx={{*/}
                {/*    width: coverWidth,*/}
                {/*    height: "100%",*/}
                {/*    backgroundColor: color.WHITE,*/}
                {/*    position: "absolute",*/}
                {/*    left: 0,*/}
                {/*    transition: 300,*/}
                {/*    zIndex: 999,*/}
                {/*}}*/}
                {/*     onMouseLeave={() => {*/}
                {/*         setCoverWidth(0)*/}
                {/*     }}>*/}
                {/*</Box>*/}
            </Box>
        </motion.div>
    );
});
export const DroppableGrid = memo(({index, bookOnRowShelf}: { index: number; bookOnRowShelf?: BookInstance }) => {
    const {setNodeRef} = useDroppable({id: `${index}`});
    // const bookInSlot = books.find((b) => b.position === index);
    return (
        <Grid
            ref={setNodeRef}
            sx={{
                width: GRID_SIZE_WIDTH,
                height: GRID_SIZE_HEIGHT,
                border: "1px dashed",
                borderColor: color.PRIMARY,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
            boxShadow={NEUMORPHIC_SHADOW.INNER_SHADOW()}
        >
            {bookOnRowShelf ? <BookComponent book={bookOnRowShelf}/> : index}
        </Grid>
    );
});
