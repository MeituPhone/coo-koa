import Joi from 'joi';
import Msg from '../consts/msg';
import examinationHandle from '../dao/handle/examination'

const examinationJoiSchema = Joi.object().keys({
    title: Joi.string().min(3).max(30).required(),
    questions: Joi.array().items(Joi.number())
})

export default {

    create: async (ctx, next) => {
        let data = ctx.body;

        let validateError = Joi.validate(data, examinationJoiSchema).error;

        if (validateError) {
            ctx.status = 400;
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            ctx.body = { error };
            return;
        }

        try {
            let result = await examinationHandle.create(data);
            ctx.status = 201;
            ctx.body = {};
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error };
        }


    },

    get: async (ctx, next) => {
        try {
            let result = await examinationHandle.findById(ctx.params.id);
            ctx.body = result;
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error };
        }
    },

    list: async (ctx, next) => {
        let { page, per_page } = ctx.body;
        let skip = (page - 1) * per_page;

        try {
            let result = await examinationHandle.fetch({}, skip, per_page);
            ctx.body = result;
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error };
        }
    },

    update: async (ctx, next) => {
        let data = ctx.body;

        let validateError = Joi.validate(data, examinationJoiSchema).error;

        if (validateError) {
            ctx.status = 400;
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            ctx.body = { error };
            return;
        }

        try {
            let result = await examinationHandle.update(ctx, params.id, data);
            ctx.body = {};
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error };
        }
    },

    disable: async (ctx, next) => {
        try {
            let result = await examinationHandle.disable(cxt.params.id);
            cxt.body = result;
        } catch (error) {
            ctx.status = error.status || 400;
            error = error.error || error;
            ctx.body = { error }
        }
    }

}