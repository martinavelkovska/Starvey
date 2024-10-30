import prisma from "@/lib/prisma";
import QuestionTable from "../../../../components/SurveyQuestionsPage/QuestionsTable"; // Adjust the import path as needed
import GalaxyBackground from "@/components/GalaxyBackground/GalaxyBackground";

const getQuestionsForSurvey = async (surveyId: string) => {
  const questions = await prisma.question.findMany({
    where: {
      surveyId,
    },
    include: {
      report: true,
      answers: true,
    },
  });

  const data = questions.map(({ id, text, answers, report }) => ({
    id,
    text,
    answersCount: answers.length,
    score: report?.sentimentScore ?? null,
  }));

  return data;
};

interface SurveyQuestionsPageProps {
  params: {
    surveyId: string;
  };
}

export default async function SurveyQuestionsPage({
  params,
}: SurveyQuestionsPageProps) {
  const questions = await getQuestionsForSurvey(params.surveyId);

  return (
    <div className="bg-black min-h-screen">
      <GalaxyBackground />

      <div className="rounded-sm shadow-default relative z-10 h-full">
        <QuestionTable questions={questions} surveyId={params.surveyId}   />
      </div>
    </div>
  );
}
