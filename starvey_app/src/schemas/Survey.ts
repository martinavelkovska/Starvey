import { SurveyStatus } from "@prisma/client";
import { z } from "zod";

const Survey = z.object({
  name: z.string(),
  introduction: z.string().optional(),
  manager: z.string().email(),
  status: z.nativeEnum(SurveyStatus).default(SurveyStatus.DRAFT),
  // endsAt: z.date(),
});

export default Survey;
