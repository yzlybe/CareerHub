const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

// GET /
router.get("/", controller.main);

module.exports = router;
