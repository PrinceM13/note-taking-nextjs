import { googleSheet } from "../config/google";

// notes sheet ---------------------------------------------------------------------------------

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

type Note = {
  id: number;
  title: string;
  content: string;
};

export const addNote = async ({ id, title, content }: Note) => {
  const googleSheetInstance = await googleSheet();
  const valueInputOption = "USER_ENTERED";

  await googleSheetInstance.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption,
    requestBody: {
      values: [[id, title, content]]
    }
  });
};

// config sheet --------------------------------------------------------------------------------

const counterRange = `config!B1`;

export const getCounter = async () => {
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({
    spreadsheetId,
    range: counterRange
  });

  let counter: number = 0;
  if (res.data.values) {
    counter = Number(res.data.values[0]);
  }

  return counter;
};

export const counterUp = async () => {
  const googleSheetInstance = await googleSheet();
  const valueInputOption = "USER_ENTERED";
  const currentCounter: number = await getCounter();
  const newCounter: number = currentCounter + 1;

  await googleSheetInstance.spreadsheets.values.update({
    spreadsheetId,
    range: counterRange,
    valueInputOption,
    requestBody: {
      values: [[newCounter]]
    }
  });

  return newCounter;
};
