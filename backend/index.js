const express = require("express");
const cors = require("cors");
const app = express();
const main = require("./db");
const sheetRouter = require("./routes/sheet.routes");
//middleware
app.use(express.json());
app.use(cors());
app.use("/", sheetRouter);
app.listen(8000, () => {
  console.log("Server is running on Port 8080");
});
