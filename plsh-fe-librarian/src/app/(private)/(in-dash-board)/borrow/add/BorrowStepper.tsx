"use client";
import { appToaster } from "@/components/primary/toaster";
import appStrings from "@/helpers/appStrings";
import { validateBorrowedBooks, validateBorrower } from "@/helpers/comparation";
import { objectToFormData } from "@/helpers/convert";
import { mapToLoanApi, mergeToUploadImage } from "@/helpers/dataTransfer";
import { capitalizeWords } from "@/helpers/text";
import { useAppDispatch } from "@/hooks/useDispatch";
import { useCreateLoanMutation, useUploadBookBorrowingImagesMutation } from "@/stores/slices/api/borrow.api.slice";
import { clearData } from "@/stores/slices/borrow-state/borrow.add-edit.slice";
import { useAppStore } from "@/stores/store";
import { Tooltip } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { usePathname, useRouter } from "next/navigation";
import React, { memo, useEffect, useMemo } from "react";
import { toast } from "sonner";
// import { toast } from "@mui/material";
function BorrowStepper(){
				const steps = useMemo( () => [
								{
												id: 0,
												label: `${ capitalizeWords( appStrings.unit.STEP ) } 1: ${ appStrings.borrow.BOOKS_CONFIRM }`,
												description: `Chọn và xác nhận danh sách sách bạn muốn mượn. Kiểm tra tình trạng sách trước khi mượn, bao gồm mô tả hư hỏng (nếu có) và hình ảnh minh họa. Đồng thời, nhập thông tin thời gian mượn và dự kiến trả sách.`,
												path: `/borrow/add`,
								},
								{
												id: 1,
												label: `${ capitalizeWords( appStrings.unit.STEP ) } 2: ${ appStrings.borrow.BORROWER_CONFIRM }`,
												description: `Xác nhận thông tin người mượn, bao gồm họ tên, mã thẻ thư viện và các thông tin liên quan.`,
												path: `/borrow/add/borrower`,
								},
								{
												id: 2,
												label: `${ capitalizeWords( appStrings.unit.STEP ) } 3: ${ appStrings.borrow.FINAL_CONFIRM }`,
												description: `Kiểm tra lại toàn bộ thông tin mượn sách, bao gồm sách đã chọn và thông tin người mượn, trước khi hoàn tất.`,
												path: `/borrow/add/confirmation`,
								},
				], [] );
				const store = useAppStore();
				const dispatch = useAppDispatch();
				const [ createLoan, { data: loanData, error: loanError, isLoading: isLoanLoading } ] = useCreateLoanMutation();
				const [ uploadBookBorrowingImages ] = useUploadBookBorrowingImagesMutation();
				const path = usePathname();
				const router = useRouter();
				const [ activeStep, setActiveStep ] = React.useState( steps.find( st => st.path === path )?.id ?? 0 );
				useEffect( () => {
								if( !(activeStep < 0 || activeStep > 2) ){
												router.push( steps[activeStep].path );
								}
				}, [ activeStep, steps, router ] );
				useEffect( () => {
								const borrowInfo = store.getState().addEditBorrowData;
								if( path === steps[1].path || path === steps[2].path ){
												const status = validateBorrowedBooks( borrowInfo.borrowedBooks );
												switch( status ){
																case "complete":
																				break;
																case "incomplete":
																				appToaster.error( appStrings.error.BORROW_BOOK_WRONG_FIELD_REQUIRED, "top-center", 4000 );
																				setActiveStep( 0 );
																				router.push( steps[0].path );
																				break;
																case "warning":
																				if( path !== steps[2].path ){
																								appToaster.warning( appStrings.warning.MISSING_BEFORE_BORROW_FIELDS, "top-center", 4000 );
																				}
																				break;
												}
								}
								if( path === steps[2].path ){
												const status = validateBorrower( borrowInfo.borrower );
												if( status?.length > 0 ){
																appToaster.error( `${ appStrings.warning.MISSING_BORROWER_FIELD }: ${ status.map( s => s.fieldName ).join( ", " ) }`, "top-center", 5000 );
																setActiveStep( 1 );
																router.push( steps[1].path );
												}
								}
				}, [ path, store, router, steps ] );
				const handleNext = () => {
								setActiveStep( ( prevActiveStep ) => prevActiveStep + 1 );
				};
				const handleBack = () => {
								setActiveStep( ( prevActiveStep ) => prevActiveStep - 1 );
				};
				const handleSubmit = async() => {
								const borrowData = store.getState().addEditBorrowData;
								const dataToRequest = await mapToLoanApi( borrowData );
								const loanResponse = await createLoan( dataToRequest );
								const checkedBorrowDataHasImage = borrowData.borrowedBooks.map( b => b.beforeBorrow.images ).flat();
								const dataHasFiles = await mapToLoanApi( borrowData, true );
								if( (checkedBorrowDataHasImage.length > 0) && dataHasFiles && loanResponse.data?.data ){
												const requestForm = objectToFormData( mergeToUploadImage( dataHasFiles.bookBorrowings, loanResponse.data.data.bookBorrowings ) );
												await uploadBookBorrowingImages( { loanId: loanResponse.data.data.id, data: requestForm } );
								}
				};
				useEffect( () => {
								if( loanError ){
												toast.error( appStrings.error.ADD_FAIL );
								}
				}, [ loanError ] );
				useEffect( () => {
								if( loanData ){
												toast.success( appStrings.success.SAVE_SUCCESS );
												dispatch( clearData() );
												router.push( `/borrow/${ loanData.data.id }` );
								}
				}, [ loanData, dispatch, router ] );
				return (
								<Box sx = { { width: '100%' } }>
												<React.Fragment>
																<Box sx = { { display: 'flex', flexDirection: 'row', pt: 2 } }>
																				<Button
																								color = "inherit"
																								disabled = { activeStep === 0 }
																								onClick = { handleBack }
																								sx = { { mr: 1 } }
																				>
																								{ appStrings.GO_BACK }
																				</Button>
																				<Box sx = { { flex: '1 1 auto' } } />
																				<Button loading = { isLoanLoading } disabled = { isLoanLoading } onClick = { activeStep === (steps.length - 1) ? handleSubmit : handleNext }>
																								{ activeStep === steps.length - 1 ? appStrings.borrow.CONFIRM : appStrings.NEXT }
																				</Button>
																</Box>
												</React.Fragment>
												<Stepper activeStep = { steps.find( st => st.path === path )?.id ?? 0 }>
																{ steps.map( ( step ) => {
																				const stepProps: { completed?: boolean } = {};
																				return (
																								<Tooltip key = { step.label } title = { step.description }>
																												<Step  { ...stepProps }>
																																<StepLabel>{ step.label }</StepLabel>
																												</Step>
																								</Tooltip>
																				);
																} ) }
												</Stepper>
								</Box>
				);
}
export default memo( BorrowStepper );

