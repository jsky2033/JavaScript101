const express = require("express");

const router = express.Router();

// state variables
const locationStorage = {
  locations: [],
};

router.post("/add-location", (req, res, next) => {
  const randomIntBetween = (min, max) => {
    // min: 5, max: 10
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  locationStorage.locations.push({
    id: randomIntBetween(0, 50),
    username: req.body.username,
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng },
  });

  res.json({
    message: "Stored location!",
  });
});

router.get("/location/:lid", (req, res, next) => {
  const locationId = req.params.lid;

  const foundLocation = locationStorage.locations.filter((location) => {
    if (location.id.toString() === locationId) {
      return true;
    }
  })[0];

  res.json({
    message: `We returned the ID: ${locationId}`,
    location: foundLocation || "Nothing found for this location",
  });
});

router.get("/all-locations", (req, res, next) => {
  res.json({
    locationStorage,
  });
});

module.exports = router;
