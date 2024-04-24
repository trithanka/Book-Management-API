const Joi = require("joi");

const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm password').messages({
            'any.only': '{{#label}} does not match password',
        }),

    })

    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "bad request", error })
    }
    next();
}

module.exports=loginValidator