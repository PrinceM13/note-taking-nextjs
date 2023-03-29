import { googleSheet } from "../config/google";

export const getNotes = async () => {
  const googleSheetInstance = await googleSheet();
  const range = `notes!A:C`;
  const res = await googleSheetInstance.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  });

  const columnName = res.data.values?.shift();
  let tempNotes;
  if (columnName) {
    tempNotes = res.data.values?.reduce((acc, el) => {
      acc.push({ [columnName[0]]: el[0], [columnName[1]]: el[1], [columnName[2]]: el[2] });
      return acc;
    }, []);
  }
  return tempNotes;
};
