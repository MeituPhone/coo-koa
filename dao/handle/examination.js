import Examination from '../models/examination';
import Msg from '../../consts/msg';

export default {

    create: async ({ title, questions }) => {
        let examination = new Examination({
            title,
            questions
        });

        try {
            return await examination.save();
        } catch (error) {
            throw { status: 400, error: Msg.CREATE_ERROR };
        }
    },

    update: async ({ id, _examination }) => {
        let examination = await Examination.findById(id);

        if (!examination) {
            throw { status: 404, error: Msg.EXAMINATION_NOT_EXIST_ERROR };
        }

        try {
            return await examination.update(_examination);
        } catch (error) {
            throw { status: 400, error: Msg.UPDATE_ERROR };
        }
    },

    fetch: async (query = {}, skip = 1, limit = 10) => {
        return await Examination.fetch(query, skip, limit);
    },

    disable: async (id) => {
        let examination = Examination.findById(id);

        if (!examination) {
            throw { status: 404, error: Msg.EXAMINATION_NOT_EXIST_ERROR }
        }

        try {
            return await examination.update({ status: 0 });
        } catch (error) {
            throw { status: 400, error: Msg.UPDATE_ERROR }
        }
    },

    find: async (id) => {
        return await Examination.findById(id);
    }

}