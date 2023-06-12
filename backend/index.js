const express = require("express");
const app = express();
const main = require("./db");
const sheetRouter = require("./routes/sheet.routes");
app.use(express.json());
app.use("/", sheetRouter);
app.listen(8080, () => {
  console.log("Server is running on Port 8080");
});
