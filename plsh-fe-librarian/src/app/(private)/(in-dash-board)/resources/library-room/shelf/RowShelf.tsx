"use client";
import { color } from "@/helpers/resources";
import { BookOnRowShelf, selectRowById, setBooksOnRow, setMaxColOnRow } from "@/stores/slices/lib-room-state/shelf.slice";
import { RootState, useAppStore } from "@/stores/store";
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core";
import { Box, Button, Card, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { motion } from "framer-motion";
import React, { memo, useCallback, useRef, useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const GRID_SIZE_HEIGHT = 100;
const GRID_SIZE_WIDTH = 40;

const initialBooks: BookOnRowShelf[] = [];
const BookComponent = memo( ( { book }: { book: BookOnRowShelf } ) => {
  // const [coverWidth, setCoverWidth] = useState<number>(0);
  const { attributes, listeners, setNodeRef, transform } = useDraggable( { id: book.id } );
  const style = {
    transform: transform ? `translate3d(${ transform.x }px, 0, 0)` : "none",
    width: GRID_SIZE_WIDTH,
    height: GRID_SIZE_HEIGHT,
  };
  return (
    <motion.div ref = { setNodeRef } style = { style }  { ...attributes }>
      <Box
        onMouseEnter = { () => {
          console.log( 1321 );
          // setCoverWidth(100)
        } }
        onMouseLeave = { () => {
          // setCoverWidth(0)
        } }
        sx = { {
          borderRadius: 1,
          textAlign: "center",
          height: GRID_SIZE_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        } }
      >
        <Card
          sx = { {
            display: "flex",
            width: GRID_SIZE_WIDTH, height: "100%",
            justifyContent: "center",
            alignItems: "center",
          } }
        >
          <Typography
            variant = "body2"
            sx = { {
              transform: 'rotate(90deg)',
              textAlign: "center",
              justifySelf: "center",
              alignItems: "center",
            } }
          >{ book.book?.title }</Typography>
        </Card>
        <IconButton
          sx = { { position: 'absolute', transform: 'rotate(90deg)', right: -10, top: -10 } }  { ...listeners }>
          <RxDragHandleDots2 />
        </IconButton>
        {/*<Box sx={{*/ }
        {/*    width: coverWidth,*/ }
        {/*    height: "100%",*/ }
        {/*    backgroundColor: color.WHITE,*/ }
        {/*    position: "absolute",*/ }
        {/*    left: 0,*/ }
        {/*    transition: 300,*/ }
        {/*    zIndex: 999,*/ }
        {/*}}*/ }
        {/*     onMouseLeave={() => {*/ }
        {/*         setCoverWidth(0)*/ }
        {/*     }}>*/ }
        {/*</Box>*/ }
      </Box>
    </motion.div>
  );
} );
const DroppableGrid = memo( ( { index, bookOnRowShelf }: { index: number; bookOnRowShelf?: BookOnRowShelf } ) => {
  const { setNodeRef } = useDroppable( { id: String( index ) } );
  // const bookInSlot = books.find((b) => b.position === index);
  return (
    <Grid
      ref = { setNodeRef }
      sx = { {
        width: GRID_SIZE_WIDTH,
        height: GRID_SIZE_HEIGHT,
        border: "1px dashed",
        borderColor: color.PRIMARY,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      } }
    >
      { bookOnRowShelf ? <BookComponent book = { bookOnRowShelf } /> : index }
    </Grid>
  );
} );
const RowShelf = ( { rowId }: { rowId: number } ) => {
  const store = useAppStore();
  const dispatch = useDispatch();
  function getRowOnShelf(){
    return selectRowById( store.getState(), rowId );
  }
  const [ inputValue, setInputValue ] = useState( "10" );
  const [ errorMessage, setErrorMessage ] = useState( "" );
  const handleGridChange = () => {
    const newCount = parseInt( inputValue, 10 );
    const rowOnShelf = getRowOnShelf();
    if( rowOnShelf ){
      const maxBookPosition = Math.max( ...rowOnShelf.booksOnRowShelf.map( ( b ) => b.position ), 0 );
      if( !isNaN( newCount ) && newCount > 0 ){
        if( newCount < maxBookPosition + 1 ){
          setErrorMessage( "Không thể thay đổi: Có sách đang nằm ngoài phạm vi mới." );
        }else{
          dispatch( setMaxColOnRow( { rowId, newMaxCol: newCount } ) );
          setErrorMessage( "" );
        }
      }
    }
  };
  return (
    <Box sx = { { width: "100%", border: "1px solid #ccc", padding: 2, position: "relative" } }>
      <Box sx = { { display: "flex", gap: 1, marginBottom: 2 } }>
        <TextField
          label = "Số ô lưới"
          variant = "outlined"
          size = "small"
          value = { inputValue }
          onChange = { ( e ) => setInputValue( e.target.value ) }
        />
        <Button variant = "contained" onClick = { handleGridChange }>Lưu</Button>
      </Box>
      <Snackbar
        open = { Boolean( errorMessage ) }
        autoHideDuration = { 3000 }
        onClose = { () => setErrorMessage( "" ) }
        message = { errorMessage }
      />
      <RowShelfContext rowId = { rowId } />
    </Box>
  );
};
const RowShelfContext = memo( function RSC( { rowId }: { rowId: number } ){
  // const rowShelf = useSelector((state: RootState) => state.shelfState.rowShelves.find(r=>r.id === rowId), shallowEqual);
  const rowShelf = useSelector( ( state: RootState ) => selectRowById( state, rowId ) );
  // const rowShelfw = useSelector((state: RootState) => state.shelfState.rowShelves);
  const dispatch = useDispatch();
  const handleDragEnd = useCallback( ( event: DragEndEvent ) => {
    const { active, over } = event;
    if( !over ) return;
    if( rowShelf ){
      const prevBooks = rowShelf.booksOnRowShelf;
      const draggedBook = prevBooks.find( ( b ) => b.id === active.id );
      const targetBook = prevBooks.find( ( b ) => b.position === Number( over.id ) );
      if( !draggedBook ) return;
      if( targetBook ){
        dispatch( setBooksOnRow(
          {
            rowId,
            booksOnRow: prevBooks.map( ( b ) =>
                                         b.id === draggedBook.id
                                           ? { ...b, x: targetBook.position }
                                           : b.id === targetBook.id
                                             ? { ...b, x: draggedBook.position }
                                             : b,
            ),
          },
        ) );
        return;
      }else{
        dispatch( setBooksOnRow( {
                                   rowId,
                                   booksOnRow: prevBooks.map( ( b ) => (b.id === draggedBook.id ? { ...b, x: Number( over.id ) } : b) ),
                                 },
        ) );
      }
    }
  }, [ rowShelf, rowId, dispatch ] );
  const shelfRef = useRef<HTMLDivElement>( null );
  const scrollShelf = ( direction: "left" | "right" ) => {
    if( shelfRef.current ){
      shelfRef.current.scrollLeft += direction === "left" ? -GRID_SIZE_WIDTH : GRID_SIZE_WIDTH;
    }
  };
  if( rowShelf )
    return (<>
      <Button
        onClick = { () => scrollShelf( "left" ) }
        sx = { { position: "absolute", left: -50, top: "50%", transform: "translateY(-50%)" } }
      >◀</Button>
      <Button
        onClick = { () => scrollShelf( "right" ) }
        sx = { { position: "absolute", right: -50, top: "50%", transform: "translateY(-50%)" } }
      >▶</Button>
      <DndContext onDragEnd = { handleDragEnd }>
        <Box
          ref = { shelfRef }
          sx = { { overflowX: "auto", whiteSpace: "nowrap", padding: 2, position: "relative", width: "100%" } }
        >
          <Grid container spacing = { 1 } sx = { { flexWrap: "nowrap", position: "relative", width: "max-content" } }>
            { [ ...Array( rowShelf.maxCol ) ].map( ( _, index ) => (
              <DroppableGrid
                key = { index } index = { index }
                bookOnRowShelf = { rowShelf.booksOnRowShelf?.find( b => b.position === index ) }
              />
            ) ) }
          </Grid>
        </Box>
      </DndContext></>);
} );
export default memo( RowShelf );
