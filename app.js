const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const targetBaseUrl = "https://9a74-84-54-82-215.ngrok-free.app/v1/email/nylas/webhook";

// Disable SSL validation for development (remove in production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios({
            method: "GET",
            url: targetBaseUrl,
            params: req.query,
        });
        console.log(response.data, "response.data");

        res.status(response.status).send(response.data);
    } catch (error) {
        console.error("Error forwarding request:", error.message);

        const status = error.response ? error.response.status : 500;
        const data = error.response ? error.response.data : "Error forwarding request";

        res.status(status).send(data);
    }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body, "req.body");

    const response = await axios.post(targetBaseUrl,req.body);
    console.log(response.data, "response.data");

    res.sendStatus(response.status)
  } catch (error) {
    console.error("Error forwarding request:", error.message);

    const status = error.response ? error.response.status : 500;
    const data = error.response ? error.response.data : "Error forwarding request";
    console.log(data, "data");

    res.sendStatus(status)
  }
});

app.listen(8000, () => {
  console.log("Started server on port 8000");
});