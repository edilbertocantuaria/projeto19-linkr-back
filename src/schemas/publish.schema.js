import joi from "joi";

export const publishSchema = joi.object({
    link: joi.string().uri().required().messages({
        'string.uri': 'O campo link deve ser uma URL válida',
        'any.required': 'O campo link é obrigatório',
    }),
    article: joi.string().allow(null),
    userId: joi.number().integer().required()
});