// components/TableClientWrapper.tsx
"use client";

import React, { useState } from 'react';
import { revalidatePath } from "next/cache";
import Table from "@/components/Table/Table";
import prisma from '@/lib/prisma';
import ActionCellRenderer from '@/components/ActionsCellRender/ActionCellRender';

interface Survey {
  id: string;
  name: string;
  manager: string;
  status: string;
}

interface TableClientWrapperProps {
  initialSurveys: Survey[];
}

const deleteSurvey = async (id: string) => {
  return prisma.survey.delete({
    where: { id },
  });
};

const AllSurveysTable: React.FC<TableClientWrapperProps> = ({ initialSurveys }) => {
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);

  const handleDeleteSurvey = async (id: string) => {
    await deleteSurvey(id);
    setSurveys(surveys.filter(survey => survey.id !== id));
    revalidatePath("/dashboard/surveys");
  };

  const columnDefs = [
    { field: "Name" },
    { field: "Manager" },
    { field: "Status" },
    {
      field: "Actions",
      cellRendererFramework: (params: any) => (
        <ActionCellRenderer data={params.data} handleDeleteSurvey={handleDeleteSurvey} />
      ),
    },
  ];

  const rowData = surveys.map((survey) => ({
    Name: survey.name,
    Manager: survey.manager,
    Status: survey.status,
    id: survey.id,
  }));

  return <Table columnDefs={columnDefs} rowData={rowData} />;
};

export default AllSurveysTable;
