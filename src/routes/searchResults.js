const router = require("express").Router();
const axios = require("axios");
const { type } = require("os");
const url = require("url");

const API_KEY = process.env.API_KEY;

router.get("/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const params = new URLSearchParams({
      access_token: API_KEY,
      ...url.parse(req.url, true).query,
    });
    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );
    data.features.forEach((item) => {
      item.city = null;
      item.state = null;

      item.context.forEach((type) => {
        if (type.id.includes("place")) {
          item.city = type.text;
        }
        if (type.id.includes("region")) {
          item.state = type.text;
        }
      });
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
