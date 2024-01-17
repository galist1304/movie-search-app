const express = require("express");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"express works!"})
})

module.exports = router;