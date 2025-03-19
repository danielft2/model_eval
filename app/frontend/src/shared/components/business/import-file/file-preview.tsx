import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Papa from "papaparse";
import { useEffect, useState } from "react";

import { fileTestCollumsDataFormat, fileTestRowDataExamples } from "@/core/mocks/file-questions-format";
import { RowData } from "@/automatic-evaluations/types/file-test-row-data";

ModuleRegistry.registerModules([AllCommunityModule]);

type FilePreviewProps = {
  file: File | undefined
}

const fileTestCollumsDataExample = fileTestCollumsDataFormat.map((col) => ({
  ...col,
  sortable: true,
  resizable: true,
}));

export function FilePreview({ file }: FilePreviewProps) {
  const [rowData, setRowData] = useState<RowData[]>(fileTestRowDataExamples);
  const [colDefs, setColumnDefs] = useState<ColDef<RowData>[]>(fileTestCollumsDataExample);

  useEffect(() => {
    handleFileUpload(file)
  }, [file])

  const handleFileUpload = (file: File | undefined) => {
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true, 
        complete: (results) => {
          const data = results.data.slice(0, 10) as RowData[];
          setRowData(data);

          const cols = Object.keys(data[0]).map((key) => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            sortable: true,
            resizable: true,
          }));
          setColumnDefs(cols as ColDef<RowData>[]);
        },
        error: () => {
          console.error("Erro ao processar o arquivo:");
        },
      });
    }
  };

  return (
    <div className="ag-theme-alpine h-[300px] w-full">
      <AgGridReact<RowData>
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={{ sortable: true }}
      />
    </div>
  );
}