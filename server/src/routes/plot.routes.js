const express = require("express");
const router = express.Router();

const plotController = require("../controllers/plot.controllers");

router.post("/", plotController.createPlot);
router.get("/", plotController.getPlots);

module.exports = router;
