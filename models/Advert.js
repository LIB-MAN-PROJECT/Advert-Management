const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema({
  recipe_name: String,
  description: String,
  price: Number,
  country_of_origin: String,
  course_type: String,
  cooking_technique: String,
  special_diet: String,
  image: String, 
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
recipeFile: {
  type: String // URL to the uploaded recipe file
}

}, { timestamps: true });

module.exports = mongoose.model("Advert", advertSchema);
