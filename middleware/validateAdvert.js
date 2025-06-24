const Joi = require("joi");

const advertSchema = Joi.object({
  recipeName: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  countryOfOrigin: Joi.string().required(),
  courseType: Joi.string().required(),
  cookingTechnique: Joi.string().required(),
  specialDiet: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
});

const validateAdvert = (req, res, next) => {
  console.log(req.body)
  const { error } = advertSchema.validate(req.body);
  console.log(error)
  if (error) {
    return res.status(400).json({ message: error.details[0].message.replace(/"/g, '') });
  }
  next();
};

module.exports = { validateAdvert };