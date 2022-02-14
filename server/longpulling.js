const express = require("express");
const cors = require("cors");
const events = require("events");
require("dotenv").config();

const PORT = process.env.PORT || 5001;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors());

app.get("/get-massages", (req, res) => {});

app.post("/new-messages", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
