import ShelfContext from "@/app/(private)/(in-dash-board)/resources/library-room/shelf/ShelfContext";
import { apiGetShelf } from "@/request/library-room.api";
import { ShelfState } from "@/stores/slices/lib-room-state/shelf.slice";
import Grid from "@mui/material/Grid2";
import { AxiosResponse } from "axios";
import React from "react";

interface IProps{
				params: Promise<{
								id: number;
				}>;
}
async function ShelfPage( props: IProps ){
				const params = await props.params;
				let shelf: ShelfState | undefined = undefined;
				try{
								const response: AxiosResponse<ShelfState> = await apiGetShelf( { id: params.id } );
								shelf = response.data;
				}catch{
								throw new Error();
				}
				return (
								<Grid container direction = "column" spacing = { 2 } width = "100%" padding = { 5 }>
												<ShelfContext data = { shelf } />
								</Grid>);
}
export default ShelfPage;
