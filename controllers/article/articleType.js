import Joi from 'joi';
import articleTypeHandle from '../../dao/handle/article/articleType';

const articleTypeJoiSchema = Joi.object().keys({
    type: Joi.string()
})

export default {

    create: async (ctx, next) => {
        let data = ctx.body;
        let validateError = Joi.validate(data, articleTypeJoiSchema).error;

        if (validateError) {
            let err = { status: 400, error: Msg.PARAMETER_ERROR }
            err.error.msg = validateError.message;
            throw (err)
        }

        try {
            let result = await articleTypeHandle.create(data);
            ctx.status = 201;
            ctx.body = {};
        } catch (error) {
            throw (error);
        }
    },

    update: async (ctx, next) => {
        let data = ctx.body;

        let validateError = Joi.validate(data, articleTypeJoiSchema).error;

        if (validateError) {
            let err = { status: 400, error: Msg.PARAMETER_ERROR }
            err.error.msg = validateError.message;
            throw (err)
        }

        try {
            let result = await articleTypeHandle.update(ctx.params.id, data);
            ctx.body = {};
        } catch (error) {
            throw (error)
        }
    },

    get: async (ctx, next) => {
        try {
            ctx.body = articleTypeHandle.findById(ctx.params.id);
        } catch (error) {
            throw (error)
        }
    },

    list: async (ctx, next) => {
        let { page = 1, per_page = 10 } = ctx.query;
        let skip = (page - 1) * per_page;

        try {
            let result = await articleTypeHandle.fetch({}, skip, per_page);
            ctx.body = result;
        } catch (error) {
            throw (error)
        }
    },

    disable: async (ctx, next) => {
        try {
            let result = await articleTypeHandle.disable(ctx.params.id);
            ctx.body = result;
        } catch (error) {
            throw (error)
        }
    }
}