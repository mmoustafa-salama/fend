// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get("/data", (req, res) => {
    res.status(200).send(projectData);
});

app.post("/data", (req, res) => {
    const temperature = req.body.temperature;
    const date = req.body.date;
    const user_response = req.body.user_response;

    // Check temperature is valid
    if (!temperature) {
        return res.status(400).send({ message: 'Temperature is required' });
    }

    // Check date is valid
    if (!date) {
        return res.status(400).send({ message: 'Date is required' });
    }

    projectData = {
        temperature: temperature,
        date: date,
        user_response: user_response
    };

    res.status(201).send(projectData);
});

// Setup Server
const port = 3000;
app.listen(port, listening);

function listening() {
    console.log("Server is running on port " + port);
    console.log('Press CTRL+C to stop server');
}