"use strict";
const express = require("express");
const router = express.Router();
const { home } = require("../controllers/blogController");
router.get("/blog", (req, res) => {
    res.json({ data: "hello route blog" });
});
router.get("/", home);
module.exports = router;
