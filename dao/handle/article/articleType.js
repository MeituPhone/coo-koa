import ArticleType from '../../models/article/articleType';
import Msg from '../../../consts/msg';

export default {

    create: async ({ type }) => {
        let articleType = new ArticleType({
            type,
            status:1
        });

        let _articleType =  await ArticleType.findByName(type)

        if (_articleType) {
            throw { status: 400, error: Msg.ARTICLE_TYPE_EXIST_ERROR }
        }

        try {
            return await articleType.save();
        } catch (error) {
            throw { status: 400, error: Msg.CREATE_ERROR };
        }
    },

    update: async (id, _articleType) => {
        let articleType = await ArticleType.findById(id);

        if (!articleType) {
            throw { status: 404, error: Msg.ARTICLE_TYPE_NOT_EXIST_ERROR }
        }

        try {
            return articleType.update(_articleType);
        } catch (error) {
            throw { status: 400, error: Msg.CREATE_ERROR }
        }
    },

    fetch: async (query = {}, skip = 1, limit = 10) => {
        return await ArticleType.fetch(query, skip, limit)
    },

    findById: async (id) => {
        return  await ArticleType.findById(id)
    },

    disable: async (id) => {
        let articleType = await ArticleType.findById(id);

        if (!articleType) {
            throw { status: 404, error: Msg.ARTICLE_TYPE_NOT_EXIST_ERROR }
        }

        try {
            return await articleType.update({ status: 0 });
        } catch (error) {
            throw { status: 400, error: Msg.CREATE_ERROR }
        }
    }

}