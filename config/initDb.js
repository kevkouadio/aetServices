const mongoose = require("mongoose");

const mongoUri = process.env.DB_URI || "mongodb://localhost:27017/aetServices";

const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

module.exports = () => {
  return mongoose
    .connect(mongoUri, dbOptions)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.error(err));
};