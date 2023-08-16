require("dotenv").config();
const express = require("express");
const { connection } = require("./db");
const { bookRoute } = require("./routes/book.route");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", bookRoute);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log(`server started on ${process.env.PORT}`);
});
