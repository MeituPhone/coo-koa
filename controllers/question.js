import questionHandle from '../dao/handle/question';
import Joi from "joi";
import Msg from '../consts/msg';


const create = async (ctx, next) => {
    let data = ctx.body;

    const validateSchema = Joi.object().keys({
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

    let validateError = Joi.validate(data, validateSchema).error;

    if (validateError) {
        cxt.status = 400;
        ctx.body = Msg.PARAMETER_ERROR;
        ctx.body.Msg = validateError.message;
        return;
    }

    try {
        let result = await questionHandle.create(data);
        ctx.status = 201;
        ctx.body = {};
    } catch (err) {
        ctx.status = err.status || 400;
        ctx.body = err.error || err;
    }

}

const update = async (ctx, next) => {
    
}

const get = async (ctx, next) => {

}

const getList = async (ctx, next) => {

}

const disable = async (ctx, next) => {

}

module.exports = {
    create,
    update,
    get,
    getList,
    disable
}


