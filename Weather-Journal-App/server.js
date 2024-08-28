// Setup empty JS object to act as endpoint for all routes
data = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

/* Routes */
// List project data.
app.get("/data", (req, res) => {
  res.send(data);
});

// Add project data.
app.post("/data", (req, res) => {
 data = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };

  // Send data object back.
  res.send(data);
});

// Setup Server
const PORT = 3000;
app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`);});