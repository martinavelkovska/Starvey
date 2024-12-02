"use client";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

interface ColumnDef {
  field: string;
  cellRendererFramework?: (params: any) => JSX.Element;
}

interface TableProps {
  columnDefs: ColumnDef[];
  rowData: any[];
}

const Table: React.FC<TableProps> = ({ columnDefs, rowData }) => {
  return (
    <div className="ag-theme-quartz w-full">
      <AgGridReact
        className="w-full table-auto bg-transparent"
        columnDefs={columnDefs}
        rowData={rowData}
        domLayout='autoHeight' // Optional: Adjust layout for auto height
      />
    </div>
  );
};

export default Table;
