const mongoose = require("mongoose");
const Joi = require("joi");

let schema = new mongoose.Schema({
  title: String,
  img_url: String,
  user_id: String,
},{timestamps:true})
exports.MovieModel = mongoose.model("movies", schema)

exports.validateMovie = (_reqBody) => {
  let joiSchema = Joi.object({
    title: Joi.string().min(2).max(400).required(),
    img_url: Joi.string().min(2).max(400).allow(null, ""),
  })
  return joiSchema.validate(_reqBody)
}