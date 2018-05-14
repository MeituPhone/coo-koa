import Joi from 'joi';
import articleTagHandle from '../../dao/handle/article/articleTag';

const articleTagJoiSchema = Joi.object().keys({
    tag: Joi.string()
})

export default {

    create: async (ctx, next) => {
        let data = ctx.request.body;
        let validateError = Joi.validate(data, articleTagJoiSchema).error;

        if (validateError) {
            let err = { status: 400, error: Msg.PARAMETER_ERROR }
            err.error.msg = validateError.message;
            throw (err)
        }

        let result = await articleTagHandle.create(data);
        ctx.status = 201;
        ctx.body = { id: result.id };
    },

    update: async (ctx, next) => {
        let data = ctx.request.body;

        let validateError = Joi.validate(data, articleTagJoiSchema).error;

        if (validateError) {
            let err = { status: 400, error: Msg.PARAMETER_ERROR }
            err.error.msg = validateError.message;
            throw (err)
        }

        let result = await articleTagHandle.update(ctx.params.id, data);
        ctx.body = {};
    },

    get: async (ctx, next) => {
        return ctx.body = await articleTagHandle.findById(ctx.params.id);
    },

    list: async (ctx, next) => {
        let { page = 1, per_page = 10 } = ctx.query;
        let skip = (page - 1) * per_page;

        let result = await articleTagHandle.fetch({}, skip, per_page);
        ctx.body = result;
    },

    disable: async (ctx, next) => {
        let result = await articleTagHandle.disable(ctx.params.id);
        ctx.body = result;
    }
}