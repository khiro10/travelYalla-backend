


const axios = require('axios');

module.exports = async function handler(req, res) {
  const key = "5ae2e3f221c38a28845f05b6f1871bf887b3a0f13b1539aa3e220ca7";
  const { id } = req.query;
  try {
            const { origin, destination, currency } = req.query;
            
            const response = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname?name=${id}&apikey=${key}`);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
};
