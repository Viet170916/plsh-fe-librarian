"use client";
import NotFound from "@/components/primary/NotFound";
import appStrings from "@/helpers/appStrings";
import { color } from "@/helpers/resources";
import Grid from "@mui/material/Grid2";
import React, { JSX } from "react";

type ErrorProps = {
				error: Error, reset: () => void
};
function Error( { error, reset }: ErrorProps ): JSX.Element{
				console.log( error );
				return (
								<Grid height = { "100%" } bgcolor = { color.WHITE }>
												<NotFound reset = { reset } message = { appStrings.error.LOAN_NOT_FOUND } />
								</Grid>
				);
}
export default Error;

