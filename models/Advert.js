const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema({
  recipeName: String,
  description: String,
  price: Number,
  countryOfOrigin: String,
  courseType: String,
  cookingTechnique: String,
  specialDiet: String,
  directions: String,
  ingredients: String,
  imageUrl: String, 
  imagePublicId: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
recipeFile: {
  type: String // URL to the uploaded recipe file
}

}, { timestamps: true });

module.exports = mongoose.model("Advert", advertSchema);
