// components/Table/ActionCellRenderer.tsx

import React from 'react';
import Link from "next/link";
import { FaTrashAlt, FaEye, FaPoll } from 'react-icons/fa';

interface ActionCellRendererProps {
  data: any;
  handleDeleteSurvey: (id: string) => void;
}

const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({ data, handleDeleteSurvey }) => {
  const { id } = data;

  return (
    <div className="flex items-center space-x-3.5">
      <Link href={`/dashboard/surveys/${id}`} className="hover:text-primary">
        <FaEye />
      </Link>
      <Link href={`/dashboard/reports/${id}`} className="hover:text-primary">
        <FaPoll />
      </Link>
      <button onClick={() => handleDeleteSurvey(id)} className="hover:text-primary">
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default ActionCellRenderer;
