"use client";
import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter

interface CompletionModalProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
  surveyLink: string; // Add surveyLink prop
}

const CompletionModal: React.FC<CompletionModalProps> = ({
  isVisible,
  onClose,
  message,
  surveyLink, // Receive surveyLink prop
}) => {
  const router = useRouter(); // Initialize router

  if (!isVisible) return null;

  const handleClose = () => {
    onClose(); // Call the original onClose function
    router.push(`/surveys/${surveyLink}`); // Navigate to the survey link
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 bg-zinc-800">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-2 right-2" onClick={handleClose}>
          <FaTimes className="text-black" />
        </button>
        <p className="text-center text-black font-medium">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-black text-white rounded-xl px-4 py-2 hover:bg-zinc-500"
            onClick={handleClose} // Use the new handleClose function
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CompletionModal;
