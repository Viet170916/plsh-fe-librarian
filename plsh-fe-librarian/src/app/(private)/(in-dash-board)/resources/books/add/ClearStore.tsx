"use client";
import { useAppDispatch } from "@/hooks/useDispatch";
import { clearData } from "@/stores/slices/book-states/book.add-edit.slice";
import { JSX, useEffect } from "react";

export default function ClearStore(): JSX.Element{
				const dispatch = useAppDispatch();
				useEffect(()=>{
								dispatch(clearData());
				},[dispatch])
				return (
								<>
								</>
				);
}
