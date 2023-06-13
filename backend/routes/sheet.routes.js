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

module.exports = sheetRouter;
