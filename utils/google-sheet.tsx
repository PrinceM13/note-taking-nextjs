import { googleSheet } from "../config/google";

const range = `notes!A:C`;
const spreadsheetId = process.env.SHEET_ID;

export const getNotes = async () => {
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({ spreadsheetId, range });
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

export const addNote = async () => {
  const googleSheetInstance = await googleSheet();
  const valueInputOption = "USER_ENTERED";

  await googleSheetInstance.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption,
    requestBody: {
      values: [["id", "title", "content"]]
    }
  });
};
