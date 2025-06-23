const Advert = require("../models/Advert");
const cloudinary = require("../utils/cloudinary");


// POST: Create new advert (vendor only)
exports.postAdvert = async (req, res) => {
  try {
    const { recipe_name, description, price, country_of_origin, course_type, cooking_technique, special_diet} = req.body;
    const image = req.file?.path; // Uploaded to Cloudinary
    const createdBy = req.user.id; // From auth middleware

    const advert = new Advert({
      recipe_name,
      description,
      price,
      image,
      country_of_origin,
      cooking_technique,
      course_type,
      special_diet,
      createdBy
    });

    await advert.save();
    res.status(201).json({ message: "Advert created", advert });
  } catch (err) {
    res.status(500).json({ message: "Error creating advert", error: err.message });
  }
};

// GET: All adverts (search & filter included)
exports.getAdverts = async (req, res) => {
  try {
    const { cooking_technique, recipe_name, minPrice, maxPrice } = req.query;
    const filter = {};

    if (cooking_technique) filter.cooking_technique = { $regex: cooking_technique, $options: "i" };
    if (recipe_name) filter.recipe_name ={recipe_name, $options: "i"};
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

    if (advert.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own advert" });
    }

    await advert.deleteOne();
    res.status(200).json({ message: "Advert deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting advert", error: err.message });
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


