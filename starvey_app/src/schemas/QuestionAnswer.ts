import { z } from "zod";

const QuestionAnswer = z.object({
  answer: z.string().max(200),
});

export default QuestionAnswer;
