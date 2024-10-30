"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";

type SentimentLabel = "POSITIVE" | "NEGATIVE" | null; // Update to match Prisma

interface Answer {
  id: string;
  answer: string;
  sentimentLabel: SentimentLabel | null; // Updated to match sentiment label from Prisma
  sentimentScore: number | null; // Allow for null
  questionId: string;
  updatedAt: Date;
  createdAt: Date;
}

interface AnswersTableProps {
  answers: Answer[]; // This should now accept Answer types with sentimentScore as number | null
}

const AnswersTable: React.FC<AnswersTableProps> = ({ answers }) => {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-transparent text-left dark:bg-meta-4">
          <th className="min-w-[220px] py-4 px-4  font-medium text-sky-900 dark:text-white xl:pl-11">
            Answer
          </th>
          <th className="min-w-[150px] py-4 px-4  font-medium text-sky-900 dark:text-white">
            Score
          </th>
          <th className="min-w-[120px] py-4 px-4  font-medium text-sky-900 dark:text-white">
            Sentiment
          </th>
        </tr>
      </thead>
      <tbody>
        {answers.map((answer) => (
           <motion.tr
           key={answer.id}
           transition={{ duration: 0 }}
           className="relative bg-transparent dark:bg-boxdark transition-shadow duration-200 "
           whileHover={{
             scale: 1.01,
             boxShadow: "0px 0px 15px 3px rgba(219,112,147,0.8)",
           }}
         >
            <td className=" py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
              {answer.answer}
            </td>
            <td className=" py-5 px-4  dark:border-strokedark ">
              {answer.sentimentScore !== null ? answer.sentimentScore : 'N/A'} {/* Handle null case */}
            </td>
            <td className=" py-5 px-4  dark:border-strokedark ">
              {answer.sentimentLabel ? answer.sentimentLabel : 'N/A'} {/* Handle null case */}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  );
};

export default AnswersTable;
