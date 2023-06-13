const mongoose = require("mongoose");
//connecting to cloud db
const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kripapandey:jaymatadi@cluster0.kca0iy2.mongodb.net/train_book"
    );
    console.log("Db connected sucessfully");
  } catch (error) {
    console.log("Db does't connected");
  }
};
main();
module.exports = main;
