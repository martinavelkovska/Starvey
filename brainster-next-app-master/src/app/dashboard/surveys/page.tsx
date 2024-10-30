import GalaxyBackground from "@/components/GalaxyBackground/GalaxyBackground";
import SurveysTable from "@/components/SurveysPage/SurveysTable";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const getSurveys = async () => {
  return prisma.survey.findMany({});
};

const deleteSurvey = async (id: string) => {
  return prisma.survey.delete({
    where: { id },
  });
};

export default async function SurveysPage() {
  const surveys = await getSurveys();

  const handleDeleteSurvey = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    await deleteSurvey(id);
    revalidatePath("/dashboard/surveys");
  };

  return (
    <div className="bg-black min-h-screen">
      <GalaxyBackground />

      <div className="rounded-sm shadow-default relative z-10 h-full">
        <SurveysTable surveys={surveys} onDeleteSurvey={handleDeleteSurvey} />
      </div>
    </div>
  );
}
