import prisma from "@/lib/prisma";
import Survey from "@/schemas/Survey";
import routeHandler from "@/lib/routeHandler";
import { SurveyStatus } from "@prisma/client";
import keyword_extractor from "keyword-extractor";
import { revalidatePath } from "next/cache";

export const GET = routeHandler(async (_, context) => {
  const { surveyId } = context.params;
  const survey = await prisma.survey.findUniqueOrThrow({
    where: {
      id: surveyId,
    },
  });

  return survey;
});

export const PATCH = routeHandler(async (request, context) => {
  const { surveyId } = context.params;
  const body = await request.json();

  const validation = await Survey.safeParseAsync(body);
  if (!validation.success) {
    throw validation.error;
  }
  const { data } = validation;
  const survey = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data,
  });

  if (data.status === SurveyStatus.FINISHED) {
    const questions = await prisma.question.findMany({
      where: { surveyId },
      include: { answers: true },
    });

    const questionReportsData = questions.map((question) => {
      // version 1
      //   let weightedSum = 0;
      //   for (let answer of question.answers) {
      //     const score = answer.sentimentScore || 0;
      //     let multiplier;
      //     if (answer.sentimentLabel === "NEGATIVE") {
      //       multiplier = -1;
      //     } else {
      //       multiplier = 1;
      //     }
      //     weightedSum += score * multiplier;
      //   }

      // version2
      // const weightedSum = question.answers.reduce((sum, currentAnswer) => {
      //   const multiplier = currentAnswer.sentimentLabel === "NEGATIVE" ? -1 : 1;
      //   return sum + (currentAnswer.sentimentScore || 0) * multiplier;
      // }, 0);
      // const totalSum = question.answers.reduce((sum, currentAnswer) => {
      //   return sum + (currentAnswer.sentimentScore || 0);
      // }, 0);

      // version3
      const { weightedSum, totalSum, answersString } = question.answers.reduce(
        (acc, currentAnswer) => {
          const multiplier =
            currentAnswer.sentimentLabel === "NEGATIVE" ? -1 : 1;
          acc.weightedSum =
            acc.weightedSum + (currentAnswer.sentimentScore || 0) * multiplier;
          acc.totalSum = acc.totalSum + (currentAnswer.sentimentScore || 0);
          acc.answersString += currentAnswer.answer;
          return acc;
        },
        { weightedSum: 0, totalSum: 0, answersString: "" }
      );

      const globalSentimentScore = weightedSum / totalSum;

      // const hf = new HfInference();
      // const keywords = await hf.tokenClassification({
      //   model: "dbmdz/bert-large-cased-finetuned-conll03-english",
      //   inputs: answersString,
      // });

      const keywords = keyword_extractor.extract(answersString, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
      });

      return {
        sentimentScore: +globalSentimentScore.toFixed(5),
        keywords,
        questionId: question.id,
      };
    });

    //if we use HfInference and have to await promises we make the map function async
    //and we await the promises like this:
    //const questionReportsData = await Promise.all(questionReportsDataPromises);

    await prisma.questionReport.createMany({
      data: questionReportsData,
    });
  }

  revalidatePath("/dashboard/surveys", "page");
  revalidatePath("/dashboard/surveys/[surveyId]", "page");
  return survey;
});

export const DELETE = routeHandler(async (_, context) => {
  const { surveyId } = context.params;

  await prisma.survey.delete({
    where: {
      id: surveyId,
    },
  });

  revalidatePath("/dashboard/surveys");
});
