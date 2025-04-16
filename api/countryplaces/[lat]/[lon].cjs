const axios = require('axios');

module.exports = async (req, res) => {
  const { lat, lon } = req.query;

  try {
    // Use lat/lon to fetch data or return a mock response
    const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/radius`, {
      params: {
        radius: 10000,
        lon,
        lat,
        rate: 2,
        format: "json",
        apikey: process.env.OTM_API_KEY // optional if you're using a real API
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};