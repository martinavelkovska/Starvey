// SuccessModal.tsx
"use client";
import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

interface SuccessModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, onClose, message }) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-zinc-800">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          <FaTimes className="text-black" />
        </button>
        <p className="text-center text-black font-medium">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-black text-white rounded-xl px-4 py-2 hover:bg-zinc-500"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;
