import * as xlsx from "xlsx";
import * as fs from "fs";

/**
 * Writes data to an Excel file.
 * @param filePath - The path to the Excel file.
 * @param sheetName - The name of the sheet where the data will be written.
 * @param data - The data to write (array of objects).
 */
export function writeToExcel(filePath: string, sheetName: string, data: any[]) {
  let workbook;
  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
    
    // If the sheet exists, delete it to avoid duplicate names
    if (workbook.SheetNames.includes(sheetName)) {
      delete workbook.Sheets[sheetName];
      const sheetIndex = workbook.SheetNames.indexOf(sheetName);
      workbook.SheetNames.splice(sheetIndex, 1);
    }
  } else {
    workbook = xlsx.utils.book_new(); // Create a new workbook if it doesn't exist
  }

  // Convert data to a sheet and append it
  const worksheet = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Write the workbook to the file
  xlsx.writeFile(workbook, filePath);
}

/**
 * Reads data from an Excel file.
 * @param filePath - The path to the Excel file.
 * @param sheetName - The name of the sheet to read data from.
 * @returns The data as an array of objects.
 */
export function readFromExcel(filePath: string, sheetName: string) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
}
