const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const colonyController = require("../controllers/colony.controllers");

router.post("/", colonyController.createColony);
router.get("/", colonyController.getColonies);
router.post("/map", upload.single("file"), colonyController.uploadMap);

module.exports = router;
