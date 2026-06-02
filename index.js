const express = require("express");
const cors = require("cors");

const jobsRoute = require("./routes/jobs");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/jobs", jobsRoute);

app.listen(3000, () => {
    console.log("Server started");
});