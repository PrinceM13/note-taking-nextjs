import { googleSheet } from "../config/google";

// notes sheet ---------------------------------------------------------------------------------

const range = `notes!A:C`;
const spreadsheetId = process.env.SHEET_ID;

export const getIds = async () => {
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({
    spreadsheetId,
    range: "notes!A:A",
    majorDimension: "COLUMNS"
  });

  let ids;
  if (res.data.values) {
    ids = res.data.values[0].reduce((acc, el, idx) => {
      acc[el] = idx;
      return acc;
    }, {});
  }

  return ids;
};

// array of all notes
export const getNotes = async () => {
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({ spreadsheetId, range });
  const columnName = res.data.values?.shift();
  let notes;

  if (columnName) {
    notes = res.data.values?.reduce((acc, el) => {
      acc.push({ [columnName[0]]: el[0], [columnName[1]]: el[1], [columnName[2]]: el[2] });
      return acc;
    }, []);
  }

  return notes;
};

// single note (specific with noteId)
export const getNote = async (noteId: number) => {
  const ids = await getIds();
  const rowNumber = 1 + ids[noteId];
  const googleSheetInstance = await googleSheet();
  const res = await googleSheetInstance.spreadsheets.values.get({
    spreadsheetId,
    range: `notes!${rowNumber}:${rowNumber}`,
    majorDimension: "ROWS"
  });

  let note;
  if (res.data.values) {
    note = {
      id: res.data.values[0][0],
      title: res.data.values[0][1],
      content: res.data.values[0][2]
    };
  }

  return note;
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

export const deleteNote = async (noteId: number) => {
  const ids = await getIds();
  const rowIndex = ids[noteId];
  const googleSheetInstance = await googleSheet();

  await googleSheetInstance.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      // request body parameters
      requests: [
        {
          deleteDimension: {
            range: {
              dimension: "ROWS",
              startIndex: rowIndex, // API indexes start at 0
              endIndex: rowIndex + 1 // endIndex is exclusive, so add 1 => delete only 1 row
            }
          }
        }
      ]
    }
  });
  // // clear data
  // const res = await googleSheetInstance.spreadsheets.values.batchClear({
  //   spreadsheetId,
  //   requestBody: {
  //     ranges: [`notes!${7}:${7}`]
  //   }
  // });
};

export const updateNote = async (noteId: number, body: any) => {
  const ids = await getIds();
  const rowIndex = ids[noteId];
  const googleSheetInstance = await googleSheet();

  await googleSheetInstance.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          updateCells: {
            rows: [
              {
                values: [
                  {
                    userEnteredValue: { stringValue: body.id }
                  },
                  {
                    userEnteredValue: { stringValue: body.title }
                  },
                  {
                    userEnteredValue: { stringValue: body.content }
                  }
                ]
              }
            ],
            fields: "userEnteredValue",
            start: { rowIndex } // sheetId: 0, columnIndex: 0 <-- use as offset column
          }
        }
      ]
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
