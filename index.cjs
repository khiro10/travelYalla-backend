const express = require("express");
const axios = require("axios");
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/countries", async (req, res) => {
  try {
    const response = await axios.get("https://api.travelpayouts.com/data/en/countries.json");
      const countries = response.data;
  
      const search = req.query.search?.toLowerCase();
      const filtered = search
        ? countries
            .map(c => c.name)
            .filter(name => name.toLowerCase().includes(search))
        : countries.map(c => c.name);
  
      res.status(200).json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const key = "5ae2e3f221c38a28845f05b6f1871bf887b3a0f13b1539aa3e220ca7";

app.get("/api/country/:id", async (req, res) => {
    try {
        const { origin, destination, currency } = req.query;
        const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${req.params.id}&apikey=${key}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  
});
app.get("/api/countryplaces/:lat/:lon", async (req, res) => {
     let radius = 30000; // 30 km radius 
    try {
        const { origin, destination, currency } = req.query;
        const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${req.params.lon}&lat=${req.params.lat}&apikey=${key}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


dotenv.config();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Load from .env
    pass: process.env.EMAIL_PASS, // Use App Password (Don't use raw password!)
  },
});

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});

app.get("/", (req, res) => {
  res.send("🌍 API is working!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
