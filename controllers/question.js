import Joi from "joi";
import Msg from '../consts/msg';
import questionHandle from '../dao/handle/question';

const questionJoiSchema = Joi.object().keys({
    title: Joi.string().min(3).max(15).required(),
    score: Joi.number(),
    sortnum: Joi.number(),
    photo: Joi.string(),
    answer: Joi.number(),
    choices: Joi.array().items(Joi.object({
        index: Joi.number().required(),
        content: Joi.string().required(),
    })).required()
})

export default {

    create: async (ctx, next) => {
        let data = ctx.body;

        let validateError = Joi.validate(data, questionJoiSchema).error;

        if (validateError) {
            cxt.status = 400;
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            cxt.body = {error};
            return;
        }

        try {
            let result = await questionHandle.create(data);
            ctx.status = 201;
            ctx.body = {};
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error };
        }

    },

    update: async (ctx, next) => {
        let data = ctx.body;

        let validateError = Joi.validate(data, questionJoiSchema).error;

        if (validateError) {
            cxt.status = 400;
            ctx.body = Msg.PARAMETER_ERROR;
            ctx.body.msg = validateError.message;
            return;
        }

        try {
            let result = await questionHandle.update(ctx.params.id, data);
            ctx.body = {};
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error }
        }
    },

    get: async (ctx, next) => {
        try {
            let result = await questionHandle.findById(ctx.params.id);
            ctx.body = result;
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error };
        }
    },

    getList: async (ctx, next) => {
        let { page = 1, per_page = 10 } = ctx.request.query;
        let skip = (page - 1) * per_page;

        try {
            let result = await questionHandle.fetch({}, skip, per_page);
            ctx.body = result;
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error
            ctx.body = { error }
        }
    },

    disable: async (ctx, next) => {
        try {
            let result = await questionHandle.disable(ctx.params.id);
            ctx.body = result;
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error
            ctx.body = { error }
        }
    }
}

