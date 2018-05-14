import Joi from 'joi';
import Msg from '../../consts/msg';
import examinationHandle from '../../dao/handle/exam/examination'

const examinationJoiSchema = Joi.object().keys({
    title: Joi.string().min(3).max(30).required(),
    questions: Joi.array().items(Joi.number())
})

export default {

    create: async (ctx, next) => {
        let data = ctx.request.body;
        let validateError = Joi.validate(data, examinationJoiSchema).error;

        if (validateError) {
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            throw ({ status: 400, error: error })
        }

        data.questions = JSON.parse(data.questions);
        let result = await examinationHandle.create(data);
        ctx.status = 201;
        ctx.body = { id: result.id };


    },

    get: async (ctx, next) => {
        let result = await examinationHandle.findById(ctx.params.id);
        ctx.body = result;
    },

    list: async (ctx, next) => {
        let { page, per_page } = ctx.request.body;
        let skip = (page - 1) * per_page;

        let result = await examinationHandle.fetch({}, skip, per_page);
        ctx.body = result;
    },

    update: async (ctx, next) => {
        let data = ctx.request.body;

        let validateError = Joi.validate(data, examinationJoiSchema).error;

        if (validateError) {
            let error = Msg.PARAMETER_ERROR;
            error.msg = validateError.message;
            throw ({ status: 400, error: error })
        }

        data.questions = JSON.parse(data.questions);
        let result = await examinationHandle.update(ctx.params.id, data);
        ctx.body = {};
    },

    disable: async (ctx, next) => {
        let result = await examinationHandle.disable(ctx.params.id);
        ctx.body = result;
    }

}