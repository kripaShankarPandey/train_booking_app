const mongoose = require("mongoose");
const { Schema } = mongoose;

const sheetSchema = new Schema({
  isBooked: Boolean,
  sheetNumber: String,
});

const SheetModel = mongoose.model("sheetDetail", sheetSchema);
module.exports = SheetModel;
