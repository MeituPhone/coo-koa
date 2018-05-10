import Joi from "joi";
import Msg from '../consts/msg';
import questionHandle from '../dao/handle/question';

const questionJoiSchema = Joi.object().keys({
    title: Joi.string().min(3).max(15).required(),
    score: Joi.number(),
    sortnum: Joi.number(),
    photo: Joi.string(),
    answer: Joi.number(),
    type: Joi.number(),
    choices: Joi.array().items(Joi.object({
        index: Joi.number().required(),
        content: Joi.string().required(),
    })).required()
})

export default {

    create: async (ctx, next) => {
        let data = ctx.request.body;
        data.choices = JSON.parse(data.choices);

        let validateError = Joi.validate(data, questionJoiSchema).error;

        if (validateError) {
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            throw ({ status: 400, error: error });
        }

        let result = await questionHandle.create(data);
        ctx.status = 201;
        ctx.body = { id: result.id };

    },

    update: async (ctx, next) => {
        let data = ctx.request.body;
        data.choices = JSON.parse(data.choices);

        let validateError = Joi.validate(data, questionJoiSchema).error;

        if (validateError) {
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            throw ({ status: 400, error: error });
        }

        let result = await questionHandle.update(ctx.params.id, data);
        ctx.body = {};
    },

    get: async (ctx, next) => {
        let result = await questionHandle.findById(ctx.params.id);
        ctx.body = result;
    },

    list: async (ctx, next) => {
        let { page = 1, per_page = 10 } = ctx.request.query;
        let skip = (page - 1) * per_page;

        let result = await questionHandle.fetch({}, skip, per_page);
        ctx.body = result;
    },

    disable: async (ctx, next) => {
        let result = await questionHandle.disable(ctx.params.id);
        ctx.body = result;
    }
}

