import PaymentPage from "@/app/(private)/(in-dash-board)/transaction/fine/ClientRender";
import Grid from "@mui/material/Grid2";

export default function Page() {
    return (
        <Grid container width="100%" sx={{my: 4, px: 14}}>
            <PaymentPage/>
        </Grid>
    );
}
// 'use client';
// import { useState, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import { CheckCircleIcon, XCircleIcon, ArrowPathIcon, ChevronRightIcon, QrCodeIcon } from '@heroicons/react/24/solid';
//
// interface Fine {
//   id: number;
//   fineDate: string;
//   fineType: number;
//   amount: number;
//   status: string;
//   note: string;
//   bookTitle: string;
//   bookCode: string;
// }
//
// interface PaymentData {
//   qrCode: string;
//   referenceId: string;
//   amount: number;
//   description: string;
//   paidFines: Fine[];
// }
//
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7147';
// const MAX_RETRIES = 30;
// const POLLING_INTERVAL = 5000;
// const API_TIMEOUT = 8000;
//
// const PaymentPage = () => {
//   const [step, setStep] = useState<number>(1);
//   const [fines, setFines] = useState<Fine[]>([]);
//   const [selectedFines, setSelectedFines] = useState<number[]>([]);
//   const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
//   const [loading, setLoading] = useState({ fines: false, payment: false, statusUpdate: false });
//   const [error, setError] = useState<string>('');
//   const retryCount = useRef(0);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const borrowerId = 1;
//
//   const updatePaymentStatus = useCallback(async () => {
//     if (!paymentData?.referenceId || retryCount.current >= MAX_RETRIES) return;
//
//     try {
//       setLoading((prev) => ({ ...prev, statusUpdate: true }));
//       const response = await axios.put(
//         `${API_URL}/api/Payment/update-status/${paymentData.referenceId}`,
//         null,
//         { timeout: API_TIMEOUT }
//       );
//
//       if (response.data.success) {
//         setFines((prev) =>
//           prev.map((f) =>
//             selectedFines.includes(f.id) ? { ...f, status: 'completed', isFined: false } : f
//           )
//         );
//         setStep(3);
//         clearInterval(intervalRef.current!);
//         console.log('Cập nhật trạng thái thành công');
//       } else {
//         retryCount.current += 1;
//         if (retryCount.current >= MAX_RETRIES) {
//           setError('Xác nhận thanh toán thất bại sau nhiều lần thử. Vui lòng thử lại.');
//           clearInterval(intervalRef.current!);
//         }
//       }
//     } catch (err) {
//       console.error('Lỗi cập nhật trạng thái:', err);
//       retryCount.current += 1;
//       if (retryCount.current >= MAX_RETRIES) {
//         setError('Lỗi xác minh thanh toán. Vui lòng thử lại hoặc liên hệ quản trị viên.');
//         clearInterval(intervalRef.current!);
//       }
//     } finally {
//       setLoading((prev) => ({ ...prev, statusUpdate: false }));
//     }
//   }, [paymentData, selectedFines]);
//
//   useEffect(() => {
//     if (step !== 2 || !paymentData) return;
//
//     intervalRef.current = setInterval(updatePaymentStatus, POLLING_INTERVAL);
//
//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       retryCount.current = 0;
//     };
//   }, [step, paymentData, updatePaymentStatus]);
//
//   const loadFines = useCallback(async () => {
//     try {
//       setLoading((prev) => ({ ...prev, fines: true }));
//       setError('');
//       const response = await axios.get(`${API_URL}/api/payment/borrower/${borrowerId}`, {
//         timeout: API_TIMEOUT,
//       });
//       if (response.data.success && Array.isArray(response.data.data)) {
//         setFines(response.data.data);
//       } else {
//         throw new Error('Invalid data format');
//       }
//     } catch (err) {
//       console.error('Error loading fines:', err);
//       setError('Không thể tải danh sách phạt. Vui lòng thử lại.');
//     } finally {
//       setLoading((prev) => ({ ...prev, fines: false }));
//     }
//   }, [borrowerId]);
//
//   useEffect(() => {
//     loadFines();
//   }, [loadFines]);
//
//   const handlePaymentCreation = async () => {
//     if (selectedFines.length === 0) {
//       setError('Vui lòng chọn ít nhất một khoản phạt');
//       return;
//     }
//     try {
//       setLoading((prev) => ({ ...prev, payment: true }));
//       setError('');
//       const response = await axios.post(
//         `${API_URL}/api/Payment/create-qr`,
//         { BorrowerId: borrowerId, FineIds: selectedFines },
//         { headers: { 'Content-Type': 'application/json' }, timeout: API_TIMEOUT }
//       );
//       if (response.data.success && response.data.data?.qrCode) {
//         const paidFines = fines.filter((f) => selectedFines.includes(f.id));
//         setPaymentData({
//           qrCode: response.data.data.qrCode,
//           referenceId: response.data.data.referenceId,
//           amount: response.data.data.amount,
//           description: `FINE_${response.data.data.referenceId}`,
//           paidFines,
//         });
//         setStep(2);
//         retryCount.current = 0;
//       } else {
//         throw new Error('Invalid response data');
//       }
//     } catch (err) {
//       console.error('QR creation error:', err);
//       setError('Khởi tạo thanh toán thất bại. Vui lòng thử lại.');
//     } finally {
//       setLoading((prev) => ({ ...prev, payment: false }));
//     }
//   };
//
//   const calculateTotal = () => {
//     return selectedFines
//       .reduce((sum, id) => sum + (fines.find((f) => f.id === id)?.amount || 0), 0)
//       .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
//   };
//
//   const resetToStep1 = () => {
//     setStep(1);
//     setSelectedFines([]);
//     setPaymentData(null);
//     setError('');
//     retryCount.current = 0;
//     loadFines();
//   };
//
//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-sm">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Thanh Toán Phạt Thư Viện</h1>
//         <p className="text-gray-600">Quản lý và thanh toán các khoản phạt mượn sách</p>
//       </div>
//
//       {/* Stepper */}
//       <div className="flex justify-between mb-8 relative">
//         <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 -z-1"></div>
//         {[1, 2, 3].map((stepNumber) => (
//           <div key={stepNumber} className="flex flex-col items-center z-10">
//             <div
//               className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                 step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
//               }`}
//               aria-current={step === stepNumber ? 'step' : undefined}
//             >
//               {stepNumber}
//             </div>
//             <div
//               className={`mt-2 text-sm font-medium ${
//                 step >= stepNumber ? 'text-blue-600' : 'text-gray-500'
//               }`}
//             >
//               {['Chọn phạt', 'Thanh toán', 'Hoàn tất'][stepNumber - 1]}
//             </div>
//           </div>
//         ))}
//       </div>
//
//       {/* Step 1: Fine Selection */}
//       {step === 1 && (
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-bold text-gray-800">Danh sách phạt chưa thanh toán</h2>
//             <button
//               onClick={loadFines}
//               disabled={loading.fines}
//               className="text-blue-600 hover:text-blue-800 text-sm flex items-center disabled:opacity-50"
//               aria-label="Làm mới danh sách phạt"
//             >
//               <ArrowPathIcon
//                 className={`w-4 h-4 mr-1 ${loading.fines ? 'animate-spin' : ''}`}
//               />
//               Làm mới
//             </button>
//           </div>
//
//           {error && (
//             <div
//               className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2"
//               role="alert"
//             >
//               <XCircleIcon className="w-5 h-5" />
//               {error}
//             </div>
//           )}
//
//           {loading.fines ? (
//             <div className="space-y-4">
//               {[...Array(3)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="animate-pulse p-4 bg-gray-100 rounded-lg h-20"
//                 />
//               ))}
//             </div>
//           ) : fines.length === 0 ? (
//             <div className="text-center py-8 bg-gray-50 rounded-lg">
//               <p className="text-gray-500">Bạn không có khoản phạt nào cần thanh toán</p>
//             </div>
//           ) : (
//             <>
//               <div className="space-y-3">
//                 {fines.map((fine) => (
//                   <div
//                     key={fine.id}
//                     className={`p-4 border rounded-lg transition-all cursor-pointer ${
//                       selectedFines.includes(fine.id)
//                         ? 'border-blue-500 bg-blue-50'
//                         : 'border-gray-200 hover:border-blue-300'
//                     }`}
//                     onClick={() =>
//                       setSelectedFines((prev) =>
//                         prev.includes(fine.id)
//                           ? prev.filter((id) => id !== fine.id)
//                           : [...prev, fine.id]
//                       )
//                     }
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter' || e.key === ' ') {
//                         setSelectedFines((prev) =>
//                           prev.includes(fine.id)
//                             ? prev.filter((id) => id !== fine.id)
//                             : [...prev, fine.id]
//                         );
//                         e.preventDefault();
//                       }
//                     }}
//                     tabIndex={0}
//                     role="checkbox"
//                     aria-checked={selectedFines.includes(fine.id)}
//                     aria-label={`Chọn phạt cho ${fine.bookTitle}`}
//                   >
//                     <div className="flex justify-between items-start">
//                       <div className="flex-1">
//                         <div className="flex items-start">
//                           <input
//                             type="checkbox"
//                             checked={selectedFines.includes(fine.id)}
//                             className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 mr-3"
//                             readOnly
//                             aria-hidden="true"
//                           />
//                           <div>
//                             <h3 className="font-semibold text-gray-800">{fine.bookTitle}</h3>
//                             <p className="text-gray-600 text-sm mt-1">{fine.note}</p>
//                           </div>
//                         </div>
//                         <div className="mt-2 text-sm text-gray-500 pl-7">
//                           <span>Ngày phạt: {new Date(fine.fineDate).toLocaleDateString('vi-VN')}</span>
//                           <span className="mx-2">•</span>
//                           <span className="font-medium text-red-600">
//                             {fine.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
//                           </span>
//                         </div>
//                       </div>
//                       <ChevronRightIcon className="w-5 h-5 text-gray-400" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//
//               <div className="sticky bottom-0 bg-white border-t pt-4 pb-2">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <p className="text-sm text-gray-500">Tổng cộng</p>
//                     <div className="font-bold text-xl text-red-600">{calculateTotal()}</div>
//                   </div>
//                   <button
//                     onClick={handlePaymentCreation}
//                     disabled={selectedFines.length === 0 || loading.payment}
//                     className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center ${
//                       selectedFines.length > 0
//                         ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
//                         : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                     } ${loading.payment ? 'opacity-75 cursor-wait' : ''}`}
//                     aria-label="Tiến hành thanh toán"
//                   >
//                     {loading.payment ? (
//                       <>
//                         <ArrowPathIcon className="w-4 h-4 animate-spin mr-2" />
//                         Đang tạo mã QR...
//                       </>
//                     ) : (
//                       <>
//                         <QrCodeIcon className="w-5 h-5 mr-2" />
//                         Thanh toán
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//
//       {/* Step 2: Payment */}
//       {step === 2 && paymentData && (
//         <div className="text-center">
//           <div className="bg-blue-50 p-4 rounded-lg mb-6">
//             <h2 className="text-xl font-bold text-blue-800 mb-2">Quét mã QR để thanh toán</h2>
//             <p className="text-gray-600">Vui lòng sử dụng ứng dụng ngân hàng để quét mã</p>
//           </div>
//
//           {error && (
//             <div
//               className="p-3 bg-red-50 text-red-700 rounded-lg flex flex-col items-center gap-2 mb-6"
//               role="alert"
//             >
//               <div className="flex items-center">
//                 <XCircleIcon className="w-5 h-5 mr-2" />
//                 {error}
//               </div>
//               <button
//                 onClick={resetToStep1}
//                 className="text-blue-600 hover:underline text-sm"
//                 aria-label="Quay lại danh sách phạt"
//               >
//                 Quay lại danh sách phạt
//               </button>
//             </div>
//           )}
//
//           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 inline-block mb-6">
//             <img
//               src={paymentData.qrCode}
//               alt="Mã QR thanh toán"
//               className="mx-auto w-64 h-64 mb-4"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = '/qr-placeholder.png';
//               }}
//             />
//             <div className="bg-gray-50 p-3 rounded-lg mb-4 text-left">
//               <p className="text-sm text-gray-500 mb-1">Nội dung chuyển khoản</p>
//               <p className="font-mono break-all bg-white p-2 rounded text-sm mb-3">
//                 {paymentData.description}
//               </p>
//               <p className="text-sm text-gray-500 mb-1">Số tiền</p>
//               <p className="text-2xl font-bold text-red-600">
//                 {paymentData.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
//               </p>
//             </div>
//           </div>
//
//           <div
//             className="flex items-center justify-center gap-2 text-gray-600 bg-yellow-50 p-3 rounded-lg max-w-md mx-auto"
//             role="status"
//           >
//             <ArrowPathIcon className="w-5 h-5 animate-spin text-yellow-600" />
//             <span>Đang xác minh thanh toán, vui lòng chờ...</span>
//           </div>
//
//           <div className="mt-6 text-sm text-gray-500">
//             <p>Nếu gặp sự cố, vui lòng liên hệ quản trị thư viện</p>
//           </div>
//         </div>
//       )}
//
//       {/* Step 3: Payment Success */}
//       {step === 3 && paymentData && (
//         <div className="text-center py-8">
//           <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//             <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <CheckCircleIcon className="w-12 h-12 text-green-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">Thanh toán thành công!</h2>
//             <p className="text-gray-600 mb-6">Cảm ơn bạn đã thanh toán. Dưới đây là chi tiết giao dịch:</p>
//
//             <div className="bg-gray-50 p-4 rounded-lg text-left space-y-3 mb-6">
//               <div>
//                 <span className="text-sm text-gray-500">Mã giao dịch:</span>
//                 <p className="font-mono break-all bg-white p-2 rounded text-sm mt-1">
//                   {paymentData.referenceId}
//                 </p>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-500">Tổng số tiền:</span>
//                 <p className="text-green-600 font-bold text-xl mt-1">
//                   {paymentData.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
//                 </p>
//               </div>
//               <div>
//                 <span className="text-sm text-gray-500">Các khoản phạt đã thanh toán:</span>
//                 <ul className="mt-2 space-y-2">
//                   {paymentData.paidFines.map((fine) => (
//                     <li
//                       key={fine.id}
//                       className="bg-white p-2 rounded flex justify-between"
//                     >
//                       <span className="text-gray-700 truncate max-w-[70%]">{fine.bookTitle}</span>
//                       <span className="text-red-600 font-medium">
//                         {fine.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//
//             <button
//               onClick={resetToStep1}
//               className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               aria-label="Quay lại danh sách phạt"
//             >
//               Quay lại danh sách phạt
//             </button>
//
//             <div className="mt-4 text-sm text-gray-500">
//               <p>Bạn có thể kiểm tra lại lịch sử mượn sách để xác nhận</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default PaymentPage;
