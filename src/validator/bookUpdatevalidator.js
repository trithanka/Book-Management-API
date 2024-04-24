const Joi = require("joi");

const bookUpdateValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        author: Joi.string().required(),
        category: Joi.string().required(),
        rating: Joi.number().required().default(0),
        publicationYear: Joi.date().required()
    })

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "bad request", error })
    }
    next();
}

module.exports=bookUpdateValidator