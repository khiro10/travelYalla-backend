import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "455dd8cb9b206f3357d09353e3856c0c"; // Replace with your actual API key

app.get("/api/flights", async (req, res) => {
    try {
        const { origin, destination, currency } = req.query;
        const response = await axios.get(`https://api.travelpayouts.com/v1/prices/cheap`, {
            params: { origin, destination, currency, token: API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));