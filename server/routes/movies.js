const express = require("express");
const { validateMovie, MovieModel } = require("../models/movieModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const id = req.tokenData._id;
    const data = await MovieModel.find({ user_id: id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post("/", auth, async (req, res) => {
  let validBody = validateMovie(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let movie = new MovieModel(req.body);
    movie.user_id = req.tokenData._id;
    await movie.save();
    res.json(movie);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
