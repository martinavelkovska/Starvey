import prisma from "@/lib/prisma";
import SurveySchema from "@/schemas/Survey";
import routeHandler from "@/lib/routeHandler";
import { revalidatePath } from "next/cache";
import nodemailer from "@/lib/nodemailer";
import { Survey } from "@prisma/client";

const getSurveyEmailTemplateHtml = (survey: Survey) => {
  const surveyUrl = `${process.env.APP_URL}/surveys/${survey.id}`;
  const reportsUrl = `${process.env.APP_URL}/dashboard/reports/${survey.id}`;

  return `<p>You've been invited to participate in our survey "${survey.name}".</p>
  Survey link: <a href="${surveyUrl}">${surveyUrl}</a><br />
  Reports link: <a href="${reportsUrl}">${reportsUrl}</a><br />
  
  <p>Thank you!</p>`;
};

export const GET = routeHandler(async () => {
  const surveys = await prisma.survey.findMany({});
  return surveys;
});

export const POST = routeHandler(async (request) => {
  const body = await request.json();
  const validation = await SurveySchema.safeParseAsync(body);

  if (!validation.success) {
    throw validation.error;
  }

  const { data } = validation;

  const survey = await prisma.survey.create({
    data,
  });

  nodemailer.sendMail({
    from: process.env.SMTP_MAIL_FROM,
    to: survey.manager,
    subject: "New Survey Created",
    html: getSurveyEmailTemplateHtml(survey),
  });

  revalidatePath("/dashboard/surveys", "page");

  return survey;
});
