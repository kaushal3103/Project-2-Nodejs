const express = require('express');

const router = express.Router();

const {createtest,updatetest} = require("../controllers/test");

router.post("/",createtest);
router.put("/:id",updatetest);

module.exports = router;


