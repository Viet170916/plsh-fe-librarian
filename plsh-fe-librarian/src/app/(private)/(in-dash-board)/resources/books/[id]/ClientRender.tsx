"use client";
import { useLazyGetBookQuery } from "@/stores/slices/api/book.api.slice";
import React, { JSX, memo } from "react";

type ClientRenderProps = {
				id?: number
}
function ClientRender( { id }: ClientRenderProps ): JSX.Element{
				const [ getBook, { data, error, isLoading } ] = useLazyGetBookQuery();
				return (
								<>
								</>
				);
}
export default memo( ClientRender );

