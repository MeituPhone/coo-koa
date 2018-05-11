import Joi from 'joi';
import articleTypeHandle from '../../dao/handle/article/articleType';

const articleTypeJoiSchema = Joi.object().keys({
    type: Joi.string()
})

export default {

    create: async (ctx, next) => {
        let data = ctx.request.body;
        let validateError = Joi.validate(data, articleTypeJoiSchema).error;

        if (validateError) {
            let err = { status: 400, error: Msg.PARAMETER_ERROR }
            err.error.msg = validateError.message;
            throw (err)
        }

        let result = await articleTypeHandle.create(data);
        ctx.status = 201;
        ctx.body = { id: result.id };
    },

    update: async (ctx, next) => {
        let data = ctx.request.body;

        let validateError = Joi.validate(data, articleTypeJoiSchema).error;

        if (validateError) {
            let err = { status: 400, error: Msg.PARAMETER_ERROR }
            err.error.msg = validateError.message;
            throw (err)
        }

        let result = await articleTypeHandle.update(ctx.params.id, data);
        ctx.body = {};
    },

    get: async (ctx, next) => {
        return ctx.body = await articleTypeHandle.findById(ctx.params.id);
    },

    list: async (ctx, next) => {
        let { page = 1, per_page = 10 } = ctx.query;
        let skip = (page - 1) * per_page;

        let result = await articleTypeHandle.fetch({}, skip, per_page);
        ctx.body = result;
    },

    disable: async (ctx, next) => {
        let result = await articleTypeHandle.disable(ctx.params.id);
        ctx.body = result;
    }
}