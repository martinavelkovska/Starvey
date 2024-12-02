// "use client";
// import React from "react";

// interface ConfirmationModalProps {
//   isOpen: boolean;
//   message: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// }

// const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
//   isOpen,
//   message,
//   onConfirm,
//   onCancel,
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded shadow-lg text-center">
//         <p className="mb-4 text-lg">{message}</p>
//         <div className="flex justify-center space-x-4">
//           <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
//             Yes
//           </button>
//           <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
//             No
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationModal;
