"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaMagnifyingGlassChart } from "react-icons/fa6";

interface Question {
  id: string;
  text: string;
  answersCount: number;
  score: number | null;
}

interface QuestionTableProps {
  questions: Question[];
  surveyId: string; 
}

const QuestionTable: React.FC<QuestionTableProps> = ({ questions, surveyId  }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-sm bg-transparent shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="max-w-full overflow-x-visible">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-transparent text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-1  font-bold  text-sky-900 dark:text-white xl:pl-9">
                    Question
                  </th>
                  <th className="min-w-[150px] py-4 px-4  font-bold text-sky-900 dark:text-white">
                    Answers
                  </th>
                  <th className="min-w-[120px] py-4 px-4 f font-bold  text-sky-900 dark:text-white">
                    Sentiment score
                  </th>
                  <th className="py-4 px-4 font-bold text-sky-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <motion.tr
                    key={question.id}
                    transition={{ duration: 0 }}
                    className="relative bg-transparent dark:bg-boxdark transition-shadow duration-200 "
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "0px 0px 15px 3px rgba(219,112,147,0.8)",
                    }}
                  >
                    <td className="py-5 px-4 pl-9 dark:border-strokedark">
                      {question.text}
                    </td>
                    <td className="py-5 px-4 dark:border-strokedark">
                      {question.answersCount}
                    </td>
                    <td className="py-5 px-4 dark:border-strokedark">
                      {question.score !== null ? question.score : "N/A"}
                    </td>
                    <td className="py-5 px-4 dark:border-strokedark">
                      <Link
                   href={`/dashboard/reports/${surveyId}/questions/${question.id}`} 
                        className="hover:text-primary" title="View Report"
                      >
                        <FaMagnifyingGlassChart />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuestionTable;
