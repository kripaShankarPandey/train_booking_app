const express = require("express");
const Router = express.Router();
const SheetModel = require("../model/sheet.model");
const sheetRouter = express.Router();

//To insert 80 data in Database this function is created  and i will this function only one time so that only one time 80 Data should insert in database
const generateData = async () => {
  try {
    const records = [];

    for (let i = 1; i <= 80; i++) {
      const sheet = {
        isBooked: false,
        sheetNumber: `A${i < 10 ? "0" + i : i}`,
      };

      records.push(sheet);
    }

    await SheetModel.insertMany(records);
    console.log("Data created successfully!");
  } catch (error) {
    console.error("Error creating data:", error);
  }
};
//Calling generate Data function only one time
//generateData();

//To get all Data from DB and show on UI
sheetRouter.get("/allsheet", async (req, res) => {
  try {
    const alldata = await SheetModel.find();
    console.log(alldata.length);
    res.status(201).send(alldata);
  } catch (e) {
    res.status(400).send({ msg: e.messgae });
  }
});

//  for booking tickets
sheetRouter.post("/bookticket", async (req, res) => {
  const numberOfTickets = req.body.numberOfTickets;

  // Find available sheets
  const availableSheets = await SheetModel.find({ isBooked: false }).limit(
    numberOfTickets
  );

  // Check if enough sheets are available
  if (availableSheets.length < numberOfTickets) {
    return res
      .status(400)
      .send({ message: "Not available. Not enough seats." });
  }

  const bookedSheets = await bookSheets(numberOfTickets, availableSheets);

  console.log(bookedSheets, "booked Sheet");
  return res.send({ tickets: bookedSheets });
});

async function bookSheets(numberOfTickets, availableSheets) {
  const bookedSheets = [];

  for (let i = 0; i < numberOfTickets; i++) {
    const sheet = availableSheets[i];
    sheet.isBooked = true;
    await sheet.save();
    bookedSheets.push({ row: sheet.row, sheet: sheet.sheetNumber });
  }

  return bookedSheets;
}

module.exports = sheetRouter;
