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
  ingredient: String,
  imageUrl: String, 
  imagePublicId: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username:{
    type: String
  },
recipeFile: {
  type: String // URL to the uploaded recipe file
},
createdAt:{
    type:Date,
    immutable:true,
    default: Date.now()
  },
  updatedAt:{
    type:Date,
    default: Date.now()
  }

}, { timestamps: true });

module.exports = mongoose.model("Advert", advertSchema);
