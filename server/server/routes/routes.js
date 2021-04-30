const express = require('express');
const router = express.Router();
const { postLogin, getCrytoBtc, postCrytoBtc } = require("../controller/controller.js");

router.post("/login", postLogin)
router.get("/cryto/btc", getCrytoBtc)
router.post("/cryto/btc", postCrytoBtc)

module.exports = router

