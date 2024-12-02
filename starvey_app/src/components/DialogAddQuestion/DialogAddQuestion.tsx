// DialogAddQuestion.tsx
"use client";
import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa"; 

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: (question: string) => void;
}

const DialogAddQuestion: React.FC<ModalProps> = ({ isVisible, onClose, children, onSubmit }) => {

    const [questionText, setQuestionText] = React.useState("");

    const handleSubmit = () => {
      onSubmit(questionText);
      setQuestionText(""); // Clear input after submitting
      onClose(); // Close the modal after submission
    };
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center  ">
      <div className="bg-zinc-800 bg-opacity-75 rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button className="absolute top-2 bg-zinc-800 right-2  rounded-full p-1 hover:bg-zinc-400">
        <FaTimes className=" text-white z-[100] overflow-auto  " onClick={onClose}/>
        </button>
        {children}
        <div className=" flex items-center justify-center  ">
        <button
            className="bg-black text-white rounded-xl px-4 py-2 text-center m-auto object-center hover:bg-zinc-500"
            onClick={handleSubmit}
          >
            Add Question
          </button>
          </div>
      </div>
    </div>,
    document.body
  );
};

export default DialogAddQuestion;
