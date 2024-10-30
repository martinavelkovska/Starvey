import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ColorBomb from "@/components/ColorBomb/ColorBomb";

const getSurvey = async (id: string) => {
  return prisma.survey.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

const getQuestions = async (surveyId: string) => {
  return prisma.question.findMany({
    where: {
      surveyId: surveyId,
    },
    orderBy: {
      position: "asc",
    },
  });
};

interface PublicSurveysPageProps {
  params: {
    surveyId: string;
  };
}

export default async function PublicSurveysPage({
  params,
}: PublicSurveysPageProps) {
  const survey = await getSurvey(params.surveyId);
  const questions = await getQuestions(params.surveyId);

  const [firstQuestion] = questions;
  const startUrl = [
    "/surveys",
    params.surveyId,
    "questions",
    firstQuestion.id,
  ].join("/");

  return (
    <div className="bg-black min-h-screen">
      <ColorBomb />
      <div className="container mx-auto pt-5 flex items-center flex-col gap-6">
        <Image
          width={32}
          height={32}
          src={"/images/logo/logo-icon.svg"}
          alt="Logo"
        />
          <div className="relative bg-black py-6 text-center text-white w-full rounded-xxl">
          {/* Gradient Border */}
          <div className="absolute inset-0 rounded-lg border-4 border-transparent">
            <div className="absolute inset-0 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-lg -m-1 opacity-20" />
          </div>

            {survey.introduction}
       
        </div>

        <Link
          href={startUrl}
          className="bg-zinc-200 hover:bg-transparent hover:text-white text-black  text-center font-medium py-2 px-6 rounded-full text-lg"
        >
          Let&apos;s start
        </Link>
      </div>
    </div>
  );
}
