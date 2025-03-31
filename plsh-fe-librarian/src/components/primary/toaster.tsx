import { color } from "@/helpers/resources";
import { Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { GoInfo } from "react-icons/go";
import { LuCircleCheck, LuSquareX } from "react-icons/lu";
import { TiWarningOutline } from "react-icons/ti";
import { ExternalToast, toast } from "sonner";

type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
const toastOption: ExternalToast = { style: { padding: 0, background: "transparent", boxShadow: "none", border: "none" } };
export const appToaster = {
				success( message: React.ReactNode, position: ToastPosition = "top-right", duration: number = 2000 ){
								toast.message( () => (
												<Grid sx = { { background: color.WHITE, borderRadius: 4 } }>
																<Alert icon = { <LuCircleCheck color = { color.COMFORT } /> } variant = "outlined" sx = { { color: color.COMFORT, borderColor: color.COMFORT, bgcolor: color.COMFORT_10, borderRadius: 4 } }>
																				{ message }
																</Alert>
												</Grid>
								), { ...toastOption, position, duration } );
				},
				warning( message: React.ReactNode, position: ToastPosition = "top-right", duration: number = 2000 ){
								toast.message( () => (
												<Grid sx = { { background: color.WHITE, borderRadius: 4 } }>
																<Alert icon = { <TiWarningOutline color = { color.WARNING } /> } variant = "outlined" sx = { { color: color.WARNING, borderColor: color.WARNING, bgcolor: color.WARNING_10, borderRadius: 4 } }>
																				{ message }
																</Alert>
												</Grid>
								), { ...toastOption, position, duration } );
				},
				error( message: React.ReactNode, position: ToastPosition = "top-right", duration: number = 2000 ){
								toast.message( () => (
												<Grid sx = { { background: color.WHITE, borderRadius: 4 } }>
																<Alert icon = { <LuSquareX color = { color.SERIOUS } /> } variant = "outlined" sx = { { color: color.SERIOUS, borderColor: color.SERIOUS, bgcolor: color.SERIOUS_10, borderRadius: 4 } }>
																				{ message }
																</Alert>
												</Grid>
								), { ...toastOption, position, duration } );
				},
				info( message: React.ReactNode, position: ToastPosition = "top-right", duration: number = 2000 ){
								toast.message( () => (
												<Grid sx = { { background: color.WHITE, borderRadius: 4 } }>
																<Alert icon = { <GoInfo color = { color.PRIMARY } /> } variant = "outlined" sx = { { color: color.PRIMARY, borderColor: color.PRIMARY, bgcolor: color.PRIMARY_O10, borderRadius: 4 } }>
																				{ message }
																</Alert>
												</Grid>
								), { ...toastOption, position, duration } );
				},
				custom( message: React.ReactNode, position: ToastPosition = "top-right", duration: number = 2000 ){
								toast.message( message, { ...toastOption, position, duration } );
				},
};
