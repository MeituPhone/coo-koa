import Joi from 'joi';
import Msg from '../../consts/msg';
import articleHandle from '../../dao/handle/article/article';

const articleJoiSchema = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    summary: Joi.string(),
    keyword: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    type: Joi.string(),
    authorName: Joi.string(),
    content: Joi.string(),
    reamrk: Joi.string()
})

export default {

    create: async (ctx, next) => {
        let data = ctx.body;
        let validateError = Joi.validate(data, articleJoiSchema).error;

        if (validateError) {
            ctx.status = 400;
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            ctx.body = { error };
            return;
        }

        try {
            let result = await articleHandle.create(data);
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

        let validateError = Joi.validate(data, articleJoiSchema).error;

        if (validateError) {
            ctx.status = 400;
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            ctx.body = { error };
            return;
        }

        try {
            let result = await articleHandle.update(ctx.params.id, data);
            ctx.body = {};
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error };
        }
    },

    get: async (ctx, next) => {
        try {
            ctx.body = articleHandle.findById(ctx.params.id);
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error };
        }
    },

    list: async (ctx, next) => {
        let { page = 1, per_page = 10 } = ctx.query;
        let skip = (page - 1) * per_page;

        try {
            let result = await articleHandle.fetch({}, skip, per_page);
            ctx.body = result;
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error
            ctx.body = { error }
        }
    },

    disable: async (ctx, next) => {
        try {
            let result = await articleHandle.disable(ctx.params.id);
            ctx.body = result;
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error
            ctx.body = { error }
        }
    }

}