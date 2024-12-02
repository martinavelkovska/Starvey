import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";
import { SurveyStatus } from "@prisma/client";

export const GET = routeHandler(async () => {
  const surveys = await prisma.survey.updateMany({
    where: {
      status: SurveyStatus.ONGOING,
      endsAt: {
        lte: new Date(),
      },
    },
    data: {
      status: SurveyStatus.FINISHED,
    },
  });

  return surveys;
});
