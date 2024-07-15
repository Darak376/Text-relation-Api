const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const FormData = require("form-data");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.post("/analyze", async (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).send("Text is required");
  }

  const formData = new FormData();
  formData.append("text", text);

  try {
    // Send the text to the sarcasm detection API
    const response = await axios.post(
      "https://sarcasm-detection.p.rapidapi.com/detect",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-rapidapi-key": "your-rapidapi-key-here",
          "x-rapidapi-host": "sarcasm-detection.p.rapidapi.com",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error analyzing text");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
