const Joi = require("joi");

const bookValidator = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        author: Joi.string().required(),
        category: Joi.string().required(),
        rating: Joi.number().required().default(0),
        publicationYear: Joi.date().required(),
        ISBN:Joi.string().required().pattern(/^[0-9]{10,13}$/),  //ISBN should be of length between 10 and 13 only
        userId:Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/) // userId should a valid ObjectId
    })

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "bad request", error })
    }
    next();
}

module.exports=bookValidator