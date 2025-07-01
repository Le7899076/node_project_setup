"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validationMiddleware(schema) {
    return async (req, res, next) => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };
        try {
            const value = await schema.validateAsync(req.body, validationOptions);
            req.body = value;
            next();
        }
        catch (e) {
            const errors = [];
            e.details.forEach((error) => {
                errors.push(error.message);
            });
            res.status(400).send({
                status: false,
                message: errors[0],
                errors: errors
            });
        }
    };
}
exports.default = validationMiddleware;
