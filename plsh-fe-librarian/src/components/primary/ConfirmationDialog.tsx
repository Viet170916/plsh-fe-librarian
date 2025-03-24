"use client";
import appStrings from "@/helpers/appStrings";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useSelector } from "@/hooks/useSelector";
import { closeDialog } from "@/stores/slices/global.slice";
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { memo } from "react";

const BootstrapDialog = styled( Dialog )( ( { theme } ) => ({
				'& .MuiDialogContent-root': {
								padding: theme.spacing( 2 ),
				},
				'& .MuiDialogActions-root': {
								padding: theme.spacing( 1 ),
				},
}) );
type ConfirmationDialogProps = { onOk?: () => void, onCancel?: () => void, children: React.ReactNode }
function ConfirmationDialog( { onOk, onCancel, children }: ConfirmationDialogProps ){
				const dispatch = useAppDispatch();
				function handleClose(){
								dispatch( closeDialog() );
				}
				function handleOk(){
								onOk?.();
								handleClose();
				}
				function handleCancel(){
								onCancel?.();
								handleClose();
				}
				const open = useSelector( state => state.global.openDialog );
				return (
								<React.Fragment>
												<BootstrapDialog
																onClose = { handleClose }
																aria-labelledby = "customized-dialog-title"
																open = { open }
												>
																<DialogContent dividers>
																				{ children }
																</DialogContent>
																<DialogActions>
																				<Button autoFocus onClick = { handleOk }>
																								{ appStrings.CONFIRM }
																				</Button>
																				<Button autoFocus onClick = { handleCancel }>
																								{ appStrings.CANCEL }
																				</Button>
																</DialogActions>
																<IconButton
																				aria-label = "close"
																				onClick = { handleClose }
																				sx = { ( theme ) => ({
																								position: 'absolute',
																								right: 8,
																								top: 8,
																								color: theme.palette.grey[500],
																				}) }
																> <CloseIcon />
																</IconButton>
												</BootstrapDialog>
								</React.Fragment>
				);
}
export default memo( ConfirmationDialog );

