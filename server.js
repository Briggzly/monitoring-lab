const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
  accessToken: "4eeff726083f4cecbcfca0718dffaf91",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const students = [];
const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  rollbar.info("HTML file served successfully!");
});

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();
  students.push(name);

  rollbar.log("Student added successfully!", {
    author: "Kyson",
    type: "Manual Entry",
  });
  res.status(200).send(students);
});

const port = process.env.PORT || 4545;

app.use(rollbar.errorHandler());

app.listen(port, () => {
  console.log(`server running on server ${port}`);
});
