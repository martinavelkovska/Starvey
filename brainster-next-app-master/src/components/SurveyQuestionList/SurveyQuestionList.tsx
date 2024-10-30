"use client";
import { QuestionsDTO } from "@/types/QuestionDTO";
import clsx from "clsx";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SurveyQuestionList() {
  const { questionId, surveyId } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionsDTO["data"]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getQuestions = useCallback(async () => {
    const response = await fetch(`/api/surveys/${surveyId}/questions`);
    const { data } = await response.json();
    setQuestions(data);

    // Find the index of the current questionId
    const initialIndex = data.findIndex((q: any) => q.id === questionId);
    setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
  }, [surveyId, questionId]);

  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
      router.push(`/surveys/${surveyId}/questions/${questions[index].id}`);
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="bg-black dark:bg-boxdark dark:drop-shadow-none rounded-md w-6/12 m-auto text-center">
      {currentQuestion && (
        <div className="relative text-center m-auto">
          <div
            className={clsx("bg-black rounded-full text-center pb-2", {
              "text-primary": questionId === currentQuestion.id,
            })}
          >
            {currentQuestion.position}
          </div>
          <Link
            href={`/surveys/${surveyId}/questions/${currentQuestion.id}`}
            className={clsx({
              "text-white text-center text-xl pt-3 mt-2": questionId === currentQuestion.id,
            })} 
          >
            {currentQuestion.text}
          </Link>
        </div>
      )}

    </div>
  );
}
