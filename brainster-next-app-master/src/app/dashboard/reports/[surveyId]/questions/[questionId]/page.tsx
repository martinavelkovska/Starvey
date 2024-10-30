import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import SentimentScoreMeter from "@/components/SentimentScoreMeter/SentimentScoreMeter";
import AnswersTable from "@/components/ReportsPage/AnswersTable"; // Import your new component
import GalaxyBackground from "@/components/GalaxyBackground/GalaxyBackground";


interface SurveyQuestionReportPageProps {
  params: {
    surveyId: string;
    questionId: string;
  };
}

const getQuestion = async (surveyId: string, questionId: string) => {
  const question = await prisma.question.findFirstOrThrow({
    where: {
      id: questionId,
      surveyId,
    },
    include: {
      report: true,
    },
  });

  return question;
};

const getQuestionData = async (surveyId: string, questionId: string) => {
  const answers = await prisma.questionAnswer.findMany({
    where: {
      question: {
        id: questionId,
        surveyId,
      },
    },
  });

  return answers;
};

export default async function SurveyQuestionReportPage({
  params,
}: SurveyQuestionReportPageProps) {
  const question = await getQuestion(params.surveyId, params.questionId);
  const answers = await getQuestionData(params.surveyId, params.questionId);



  const keywords = (question.report?.keywords || []).splice(0, 10);

  return (
    <div className="bg-black min-h-screen">
    <GalaxyBackground />
    <div className="container">
      <div className="grid grid-cols-7 gap-10">
        <div className="col-span-5">
          <p className="mb-5">Question: {question.text}</p>
          <AnswersTable answers={answers} /> {/* Use the AnswersTable component */}
        </div>
        <div className="col-span-2">
          <div className="flex flex-col gap-10">
        
          {/* <motion.button
            // href={`/dashboard/reports/${params.surveyId}`}
            whileTap={{ scale: 0.95 }}
            className="bg-zinc-200 hover:bg-transparent hover:text-white text-black font-bold py-2 px-4 rounded-full text-lg"
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            Back to questions list
          </motion.button> */}
            <Link
              href={`/dashboard/reports/${params.surveyId}`}
              className="bg-zinc-200 hover:bg-transparent hover:text-white text-black  text-center font-medium py-2 px-4 rounded-full text-lg"
            >
              Back to questions list
            </Link>
            {question.report ? (
              <div className=" bg-transparent shadow-default dark:border-strokedark dark:bg-boxdark">
                <h6 className=" dark:border-strokedark  text-center font-medium text-white dark:text-white">
                  Sentiment score
                </h6>
                <SentimentScoreMeter value={question.report.sentimentScore} />
              </div>
            ) : null}
            {keywords.length ? (
              <div className="rounded-sm border border-stroke bg-transparent shadow-default dark:border-strokedark dark:bg-boxdark">
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="min-w-[120px] py-4 px-4 font-medium text-white dark:text-white border-b border-[#eee]">
                        Keywords
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.map((keyword) => (
                      <tr key={keyword}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark xl:pl-11">
                          {keyword}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
