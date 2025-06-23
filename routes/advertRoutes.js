const express = require("express");
const router = express.Router();
const {
  postAdvert,
  getAdverts,
  getAdvertById,
  updateAdvert,
  deleteAdvert,
} = require("../controllers/advertController");

const {
  authenticate,
  authorizeVendor,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { validateAdvert } = require("../middleware/validateAdvert");
const uploadRecipe = require("../middleware/uploadRecipeMiddleware");
const { uploadRecipeFile } = require("../controllers/advertController");

// PUBLIC ROUTES
router.get("/", getAdverts); // Get all adverts
router.get("/:id", getAdvertById); // Get one advert by ID

// PROTECTED ROUTES (for vendors only)

router.post(
  "/",
  authenticate,
  authorizeVendor,
  validateAdvert,
  upload.single("image"),
  // #swagger.security = [{ "bearerAuth": [] }]
  postAdvert
);




router.put(
  "/:id",
  authenticate,
  authorizeVendor,
  validateAdvert,
  upload.single("image"),
  // #swagger.security = [{ "bearerAuth": [] }]
  updateAdvert
); // Update advert
router.delete("/:id", authenticate, authorizeVendor, deleteAdvert); // Delete advert

router.post(
  "/upload-recipe/:id",
  authenticate,
  authorizeVendor,
  uploadRecipe.single("recipe"), // 'recipe' is the form field name
  uploadRecipeFile
);

module.exports = router;
