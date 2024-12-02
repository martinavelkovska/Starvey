import ColorBomb from "@/components/ColorBomb/ColorBomb";
import SurveyQuestionList from "@/components/SurveyQuestionList/SurveyQuestionList";
import React from "react";

interface PublicSurveyLayoutProps {
  children: React.ReactNode;
}

export default async function PublicSurveyLayout({
  children,
}: PublicSurveyLayoutProps) {
  return (
    <div className="min-h-screen  bg-black">
      <div className="relative">
        <div className=" py-10">
          <SurveyQuestionList />
          <ColorBomb />
        </div>
        <div className="col-span-5">{children}</div>
      </div>
    </div>
  );
}
