import ArticleType from '../../models/article/articleType';
import Msg from '../../../consts/msg';

export default {

    create: async ({ type }) => {
        let articleType = new ArticleType({
            type
        });

        let _articleType = ArticleType.findbyName(type)

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
        let articleType = ArticleType.findById(id);

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
        return ArticleType.fetch(query, skip, limit)
    },

    findById: async (id) => {
        return ArticleType.findById(id)
    },

    disable: async (id) => {
        let articleType = ArticleType.findById(id);

        if (!articleType) {
            throw { status: 404, error: Msg.ARTICLE_TYPE_NOT_EXIST_ERROR }
        }

        try {
            return articleType.update({ status: 0 });
        } catch (error) {
            throw { status: 400, error: Msg.CREATE_ERROR }
        }
    }

}