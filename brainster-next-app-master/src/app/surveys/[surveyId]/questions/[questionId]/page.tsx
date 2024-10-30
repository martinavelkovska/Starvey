"use client";
import SuccessModal from "@/components/SuccessModal/SuccessModal";
import CompletionModal from "@/components/CompletionModal/CompletionModal"; // Import completion modal
import { Question } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function PublicSurveyQuestionPage() {
  const [questionData, setQuestionData] = useState<Question>();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false); // For completion
  const { surveyId, questionId } = useParams();
  const router = useRouter(); // Use router for navigation
  const [nextQuestionId, setNextQuestionId] = useState<string | null>(null); // Store next question ID

  // Ensure surveyLink is a string
  const surveyLink = Array.isArray(surveyId) ? surveyId[0] : surveyId;

  const getQuestionData = useCallback(async () => {
    const response = await fetch(
      `/api/surveys/${surveyLink}/questions/${questionId}`
    );
    const { data } = await response.json();
    setQuestionData(data);
  }, [surveyLink, questionId]);

  useEffect(() => {
    getQuestionData();
  }, [getQuestionData]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const answer = inputRef.current?.value;
    try {
      await fetch(`/api/surveys/${surveyLink}/questions/${questionId}/answers`, {
        method: "POST",
        body: JSON.stringify({ answer }),
      });
      inputRef.current!.value = "";

      const nextId = await getNextQuestionId(); // Fetch the next question ID
      setNextQuestionId(nextId); // Set the next question ID
      setShowSuccessModal(true); // Show success modal on successful submission
    } catch (error) {
      alert(
        "Oops.. Something went wrong while submitting the answer, try again."
      );
      console.error("Failed to submit answer!", error);
    }
  };

  const getNextQuestionId = async () => {
    const response = await fetch(`/api/surveys/${surveyLink}/questions`);
    const { data } = await response.json();
    const currentQuestionIndex = data.findIndex(
      (q: Question) => q.id === questionId
    );

    if (
      currentQuestionIndex === -1 ||
      currentQuestionIndex === data.length - 1
    ) {
      return null; // No next question
    }

    return data[currentQuestionIndex + 1]?.id; // Return next question ID
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false); // Close the success modal
    if (nextQuestionId) {
      router.push(`/surveys/${surveyLink}/questions/${nextQuestionId}`); // Navigate to the next question
    } else {
      setShowCompletionModal(true); // Show completion modal if there are no more questions
    }
  };

  const handleCompletionModalClose = () => {
    setShowCompletionModal(false);
    router.push(`/surveys/${surveyLink}`); // Navigate to the survey page
  };

  return (
    <form
      className="flex flex-col gap-5 py-5 w-6/12 m-auto"
      onSubmit={handleFormSubmit}
    >
      <textarea
        ref={inputRef}
        name="answer"
        rows={10}
        placeholder="Type your answer here..."
        className="w-full rounded-3xl border-[1.5px] border-stroke bg-transparent py-3 px-5"
        required={questionData?.required || false}
      ></textarea>
      <div className="relative group">
        <div className="absolute transition-all duration-1000 opacity-70 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt focus:outline-none"></div>
        <button
          className="relative inline-flex items-center justify-center w-full px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-transparent rounded-xl border-2 border-transparent group-hover:border-transparent focus:border-transparent focus:outline-none"
          type="submit"
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
          <span className="relative block bg-transparent focus:outline-none hover:outline-none active:border-none hover:p-[0px]">
            Submit Answer
          </span>
        </button>
      </div>

      <SuccessModal
        isVisible={showSuccessModal}
        onClose={handleSuccessModalClose} // Handle navigation on modal close
        message="Your answer was successfully submitted!"
      />
      <CompletionModal
        isVisible={showCompletionModal}
        onClose={handleCompletionModalClose} // Close and navigate to survey link
        message="All answers are submitted!"
        surveyLink={surveyLink} // Pass the survey link here
      />
    </form>
  );
}
