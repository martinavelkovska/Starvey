// SurveyFormQuestionList.tsx
"use client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { FaClone, FaTrash } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";
import { ReactSortable, SortableEvent } from "react-sortablejs";
import Switch from "../Switch/Switch";
import { QuestionsDTO } from "@/types/QuestionDTO";
import { debounce } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { Question } from "@prisma/client";
import Modal from "../DialogAddQuestion/DialogAddQuestion";

interface SurveyFormQuestionListProps {
  surveyId: string;
}

export default function SurveyFormQuestionList({
  surveyId,
}: SurveyFormQuestionListProps) {
  const [questions, setQuestions] = useState<QuestionsDTO["data"]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState("");
  const handleModalOpen = () => setIsModalVisible(true);
  const handleModalClose = () => setIsModalVisible(false);

  const getQuestions = useCallback(async () => {
    const response = await fetch(`/api/surveys/${surveyId}/questions`);
    const { data } = await response.json();
    setQuestions(data);
  }, [surveyId]);

  const handleAddQuestion = async () => {
    await fetch(`/api/surveys/${surveyId}/questions`, {
      method: "POST",
      body: JSON.stringify({
        text: newQuestionText,
      }),
    });

    setNewQuestionText("");
    setIsModalVisible(false); // Close modal after adding the question
    getQuestions(); // Refresh the question list
  };

  const handleCloneQuestion = async (questionId: string) => {
    // Find the question to clone
    const questionToClone = questions.find((q) => q.id === questionId);
    if (!questionToClone) return;

    // Send a POST request to clone the question
    await fetch(`/api/surveys/${surveyId}/questions`, {
      method: "POST",
      body: JSON.stringify({
        text: questionToClone.text,
      }),
    });

    // Refresh the question list after cloning
    getQuestions();
  };

  const handleDeleteQuestion = async (questionId: string) => {
    const response = await fetch(`/api/surveys/${surveyId}/questions/${questionId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // Remove the deleted question from the local state
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));
    }
  };
  const handleQuestionTextChange = debounce(
    async ({ target }: FormEvent<HTMLDivElement>, questionId: string) => {
      await fetch(`/api/surveys/${surveyId}/questions/${questionId}`, {
        method: "PATCH",
        body: JSON.stringify({
          text: (target as any).innerText,
        }),
      });
    },
    500
  );

  const handleToggle = async (item: Question) => {
    const newRequiredState = !item.required;
    const response = await fetch(
      `/api/surveys/${surveyId}/questions/${item.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          required: newRequiredState,
        }),
      }
    );

    if (response.ok) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === item.id ? { ...q, required: newRequiredState } : q
        )
      );
    }
  };

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  return (
    <div
      className="rounded-sm bg-transparent shadow-default dark:border-strokedark dark:bg-boxdark"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Survey Form Header */}
      <div className="grid grid-cols-7 py-4.5 px-4 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-1">
          <p className="font-medium">Position</p>
        </div>
        <div className="col-span-6 flex">
          <p className="font-medium">Text</p>
        </div>
        <div className="col-span-1 flex">
          <p className="font-medium">Is Required?</p>
        </div>
        <div className="col-span-1"></div>
      </div>
      {/* Questions List */}
      <ReactSortable
        list={questions}
        setList={setQuestions}
        animation={200}
        handle=".handle"
      >
        {questions.map((item, index) => (
          <motion.div
            key={item.id}
            transition={{ duration: 0 }}
            className="relative bg-transparent grid grid-cols-7 py-4.5 sm:grid-cols-9 md:px-6 2xl:px-7.5 dark:bg-boxdark transition-shadow duration-200"
          >
            <div className="col-span-1 flex items-center gap-2 handle cursor-move">
              <IoReorderThreeSharp className="text-2xl" />
              <span>{index + 1}</span>
            </div>
            <div
              className="col-span-6 flex items-center !border-0 !outline-0"
              contentEditable
              onInput={(e) => handleQuestionTextChange(e, item.id)}
              suppressContentEditableWarning={true}
            >
              {item.text}
            </div>
            <div className="col-span-1">
              <Switch
                enabled={item.required}
                onToggle={() => handleToggle(item)}
              />
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <button className="hover:text-primary py-2 px-2 rounded text-lg" onClick={()=>handleCloneQuestion(item.id)}>
                <FaClone />
              </button>
              <button
                className="hover:text-primary py-2 px-2 rounded text-lg"
                onClick={() => handleDeleteQuestion(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </ReactSortable>
      {/* Add Question Button */}
      <div className="w-full">
      <div className="flex items-centar justify-center transition-all duration-1000 opacity-70 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt focus:outline-none"></div>
        <button
          className="relative inline-flex items-center justify-center  px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-xl border-2 border-transparent group-hover:border-transparent focus:border-transparent focus:outline-none "
          onClick={handleModalOpen}
        >
           <span
                className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] hover:outline-none hover:p-[0px]"
                style={{
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                aria-hidden="true"
              ></span>
          Add a Question
        </button>
        
      </div>
      {/* Modal for Adding a New Question */}
      <Modal isVisible={isModalVisible} onClose={handleModalClose}  onSubmit={handleAddQuestion}>
        <h2 className="text-xl font-bold mb-4 text-violet-500 text-center">Add New Question</h2>
        <textarea
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          rows={4}
          className="w-full border rounded bg-zinc-300 opacity-90 p-2 mb-4 text-black"
          placeholder="Type your question here..."
        />
  
      </Modal>
    </div>
  );
}
