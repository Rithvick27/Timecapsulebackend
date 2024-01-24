require("dotenv").config();
const connectToMongo = require("./db");

connectToMongo();
const express = require("express");
var cors = require("cors");

const app = express();

const port =process.env.port;
app.use(express.json());
app.use(cors());
// available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/data"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
