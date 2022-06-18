const express = require("express");
const cors = require("cors");
require("dotenv").config();

const searchResults = require("./routes/searchResults");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use("/api/search", searchResults);

app.listen(PORT, () =>
  console.log("🚀 Server started at port " + PORT + " 🚀")
);
