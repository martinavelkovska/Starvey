import ColorBomb from "@/components/ColorBomb/ColorBomb";
import SurveyForm from "@/components/SurveyForm/SurveyForm";
import { SurveyDTO } from "@/types/SurveyDTO";
import { SurveyStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createSurvey = async (formData: FormData): Promise<SurveyDTO> => {
  const data: Partial<SurveyDTO["data"]> = {
    name: formData.get("name") as string,
    manager: formData.get("manager") as string,
    introduction: formData.get("introduction") as string,
    status: formData.get("status") as SurveyStatus,
  };

  const response = await fetch(`${process.env.API_URL}/surveys`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
};

export default async function SurveyCreatePage() {
  const handleCreateSurvey = async (formData: FormData) => {
    "use server";
    const { data } = await createSurvey(formData);
    revalidatePath("/dashboard/surveys");
    redirect("/dashboard/surveys/" + data.id);
  };

  return <> <SurveyForm title="Create a Survey" action={handleCreateSurvey} /> 
  <ColorBomb />
   {/* <ColorBomb /> */}
  </>;
}