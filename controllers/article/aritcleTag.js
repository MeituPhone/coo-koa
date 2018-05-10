import Joi from 'joi';
import articleTagHandle from '../../dao/handle/article/articleTag';

const articleTagJoiSchema = Joi.object().keys({
    tag: Joi.string()
})

export default {

    create: async (ctx, next) => {
        let data = ctx.body;
        let validateError = Joi.validate(data, articleTagJoiSchema).error;

        if (validateError) {
            let err = {status:400,error:Msg.PARAMETER_ERROR}
            err.error.msg = validateError.message;
            throw(err)
        }

        try {
            let result = await articleTagHandle.create(data);
            ctx.status = 201;
            ctx.body = {};
        } catch (error) {
            throw (error);
        }
    },

    update: async (ctx, next) => {
        let data = ctx.body;

        let validateError = Joi.validate(data, articleTagJoiSchema).error;

        if (validateError) {
            let err = {status:400,error:Msg.PARAMETER_ERROR}
            err.error.msg = validateError.message;
            throw(err)
        }

        try {
            let result = await articleTagHandle.update(ctx.params.id, data);
            ctx.body = {};
        } catch (error) {
            throw(error)
        }
    },

    get: async (ctx, next) => {
        try {
            ctx.body = articleTagHandle.findById(ctx.params.id);
        } catch (error) {
            throw(error)
        }
    },

    list: async (ctx, next) => {
        let { page = 1, per_page = 10 } = ctx.query;
        let skip = (page - 1) * per_page;

        try {
            let result = await articleTagHandle.fetch({}, skip, per_page);
            ctx.body = result;
        } catch (error) {
            throw(error)
        }
    },

    disable: async (ctx, next) => {
        try {
            let result = await articleTagHandle.disable(ctx.params.id);
            ctx.body = result;
        } catch (error) {
            throw(error)
        }
    }
}