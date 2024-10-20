import * as XLSX from "xlsx";

type ExportExcelProps<TData> = {
  data: TData[];
  fileName: string;
};

const ExportExcelFile = <TData>({ data, fileName }: ExportExcelProps<TData>) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Create a blob and download the file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
export default ExportExcelFile;
