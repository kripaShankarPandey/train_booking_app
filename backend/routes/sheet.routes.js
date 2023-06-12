const express = require("express");
const Router = express.Router();
const SheetModel = require("../model/sheet.model");
const sheetRouter = express.Router();
//registering users
sheetRouter.get("/", async (req, res) => {
  // const { name, email, password, isAdmin } = req.body;
  try {
    res.status(201).send({ msg: "User Registed Sucessfull" });
  } catch (e) {
    res.status(400).send({ msg: e.messgae });
  }
});

module.exports = sheetRouter;
