const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
