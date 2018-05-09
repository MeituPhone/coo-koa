import Question from '../models/question';
import Msg from '../../consts/msg';

export default {

    create: async ({ title, score, sortnum, photo, answer, choices }) => {
        let question = new Question({
            title,
            score,
            sortnum,
            photo,
            answer,
            choices,
            status: 1,
        });

        try {
            return await question.save();
        } catch (error) {
            throw { status, error: Msg.CREATE_ERROR };
        }
    },

    update: async (id, { score, sortnum, photo, answer, choices }) => {
        let _question = new Question({
            title,
            score,
            sortnum,
            photo,
            answer,
            choices,
        });
        let question = await Question.findById(id);
        if (!question) {
            throw { status: 404, error: Msg.QUESTION_NOT_EXIST_ERROR };
        }

        try {
            return await question.update(_question);
        } catch (error) {
            throw { status: 400, error: Msg.CREATE_ERROR };
        }
    },

    fetch: async (query = {}, skip = 1, limit = 10) => {
        return await Question.fetch(query, skijp, limit);
    },

    disable: async (id) => {
        let question = await Question.findById(id);

        if (!question) {
            throw { status: 404, error: Msg.QUESTION_NOT_EXIST_ERROR };
        }

        try {
            return await question.update({ status: 0 });
        } catch (error) {
            throw { status: 400, error: Msg.UPDATE_ERROR };
        }
    },

    find: async (id) => {
        return await Question.findById(id);
    }

}
