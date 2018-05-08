import Question from '../models/question'

const exports = {

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
            throw error
        }
    },

    update: async ({ id, title, score, sort }) => {

    },

    fetch: async () => {

    },

    disable: async () => {

    },

    find: async (id) => {
        return await Question.findById(id);
    },

    fetch: async (query = {}, skip = 1, limit = 10) => {
        return await Question.fetch(query, skip, limti);
    },

}

export default exports;