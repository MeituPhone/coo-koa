import ArticleTag from '../../models/article/articleTag';
import Msg from '../../../consts/msg';

export default {

    create: async ({ tag }) => {
        let articleTag = new ArticleTag({
            tag,
            status: 1
        });

        let _articleTag = await ArticleTag.findByName(tag);

        if (_articleTag) {
            throw { status: 400, error: Msg.ARTICLE_TAG_EXIST_ERROR };
        }

        try {
            return await articleTag.save();
        } catch (error) {
            throw { status: 400, error: Msg.CREATE_ERROR };
        }
    },

    update: async (id, _articleTag) => {
        let articleTag = await ArticleTag.findById(id);
        if (!articleTag) {
            throw { status: 404, error: Msg.ARTICLE_TAG_NOT_EXIST_ERROR };
        }

        try {
            return articleTag.update(_articleTag);
        } catch (error) {
            throw { status: 400, error: Msg.UPDATE_ERROR };
        }
    },

    fetch: async (query = {}, skip = 1, limit = 10) => {
        return await ArticleTag.fetch(query, skip, limit);
    },

    findById: async (id) => {
        return await ArticleTag.findById(id);
    },

    disable: async (id) => {
        let articleTag = await ArticleTag.findById(id);
        if (!articleTag) {
            throw { status: 404, error: Msg.ARTICLE_TAG_NOT_EXIST_ERROR };
        }

        try {
            return await articleTag.update({ status: 0 });
        } catch (error) {
            throw { status: 400, error: Msg.UPDATE_ERROR };
        }
    }


}
