const mongoose = require("mongoose");
const mongoURI = process.env.mongoURI;

const connectToMongo = () => {
  mongoose.connect(mongoURI);
};
module.exports = connectToMongo;
