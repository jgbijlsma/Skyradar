const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("common"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));

app.use("/api", require("./routers/openSkyRouter"));
