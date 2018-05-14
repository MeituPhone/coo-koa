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
        let data = ctx.request.body;
        let validateError = Joi.validate(data, articleJoiSchema).error;

        if (validateError) {
            let err = { status: 400, error: Msg.PARAMETER_ERROR };
            err.error.msg = validateError.message;
            throw err;
        }

        data.tags = JSON.parse(data.tags);
        let result = await articleHandle.create(data);
        ctx.status = 201;
        ctx.body = { id: result.id };

    },

    update: async (ctx, next) => {
        let data = ctx.request.body;

        let validateError = Joi.validate(data, articleJoiSchema).error;

        if (validateError) {
            let err = { status: 400, error: Msg.PARAMETER_ERROR };
            err.error.msg = validateError.message;
            throw err;
        }

        data.tags = JSON.parse(data.tags);        
        let result = await articleHandle.update(ctx.params.id, data);
        ctx.body = {};
    },

    get: async (ctx, next) => {
        ctx.body =  await articleHandle.findById(ctx.params.id);
    },

    list: async (ctx, next) => {
        let { page = 1, per_page = 10 } = ctx.query;
        let skip = (page - 1) * per_page;

        let result = await articleHandle.fetch({}, skip, per_page);
        ctx.body = result;
    },

    disable: async (ctx, next) => {
        let result = await articleHandle.disable(ctx.params.id);
        ctx.body = result;
    }

}