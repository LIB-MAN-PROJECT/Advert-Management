const Advert = require("../models/Advert");
const cloudinary = require("../utils/cloudinary");



// POST: Create new advert (vendor only)
exports.postAdvert = async (req, res) => {

  try {
    // 1. Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "adverts" // optional folder in your Cloudinary account
    });


    // 2. Save advert info along with Cloudinary image
    const newAdvert = new Advert({
      recipeName: req.body.recipeName,
      description: req.body.description,    
      price: req.body.price,
      countryOfOrigin: req.body.countryOfOrigin,
      courseType: req.body.courseType,
      cookingTechnique: req.body.cookingTechnique,
      specialDiet: req.body.specialDiet,
      imageUrl: result.secure_url,  // Cloudinary image URL
      imagePublicId: result.public_id, // Useful for deleting later
      createdBy: req.user.id
    });

    const saved = await newAdvert.save();
    const populated = await saved.populate("createdBy", "username email");
     res.status(201).json(populated);
  } catch (error) {
    console.error("Error in postAdvert", error);
    res.status(400).json({ message: "Failed to create advert", error: error.message || error });
  }
};

    

// GET: All adverts (search & filter included)
exports.getAdverts = async (req, res) => {
  try {
    const { cookingTechnique, recipeName, minPrice, maxPrice } = req.query;
    const filter = {};

    if (cookingTechnique) filter.cookingTechnique = { $regex: cookingTechnique, $options: "i" };
    if (recipeName) filter.recipeName ={recipeName, $options: "i"};
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;

    const adverts = await Advert.find(filter).populate("createdBy", "username email");
    res.status(200).json(adverts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching adverts", error: err.message });
  }
};

// GET: Single advert by ID
exports.getAdvertById = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id).populate("createdBy", "username email");
    if (!advert) return res.status(404).json({ message: "Advert not found" });

    res.status(200).json(advert);
  } catch (err) {
    res.status(500).json({ message: "Error fetching advert", error: err.message });
  }
};

// PUT: Update advert (vendor only, must be owner)
exports.updateAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: "Advert not found" });

    if (advert.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own advert" });
    }

    const updatedFields = req.body;
    if (req.file) {
      updatedFields.image = req.file.path;
    }

    const updatedAdvert = await Advert.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    res.status(200).json({ message: "Advert updated", updatedAdvert });
  } catch (err) {
    res.status(500).json({ message: "Error updating advert", error: err.message });
  }
};

// DELETE: Remove advert (vendor only, must be owner)
exports.deleteAdvert = async (req, res) => {
  try {
    const advert = await Advert.findById(req.params.id);
    if (!advert) return res.status(404).json({ message: "Advert not found" });

     // Ensure advert.vendor exists before comparing
    if (!advert.createdBy || advert.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this advert" });
    }

    // Delete image from Cloudinary if it exists
    if (advert.imagePublicId) {
      await cloudinary.uploader.destroy(advert.imagePublicId);
    }

    await Advert.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Advert deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting advert",
      error: error.message
    });
  }
};


exports.uploadRecipeFile = async (req, res) => {
  try {
    const advertId = req.params.id;

    // Use Cloudinary upload_stream for non-images
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "raw" }, 
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message });

        // Save file URL to the advert
        const updatedAdvert = await Advert.findByIdAndUpdate(
          advertId,
          { recipeFile: result.secure_url },
          { new: true }
        );

        res.json({
          message: "Recipe file uploaded successfully",
          fileUrl: result.secure_url,
          advert: updatedAdvert
        });
      }
    );

    // Send file buffer to Cloudinary
    uploadStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


