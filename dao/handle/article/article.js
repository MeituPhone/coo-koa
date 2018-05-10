import Article from '../../models/article/article';
import Msg from '../../../consts/msg';

export default {

    create: async ({ title, description, summary, keyword, tags, type, authorName, content, remark }) => {
        let article = new Article({
            title,
            description,
            summary,
            keyword,
            tags,
            type,
            authorName,
            content,
            remark
        })

        try {
            return await article.save();
        } catch (error) {
            throw { stutas: 400, error: Msg.CREATE_ERROR }
        }
    },

    update: async (id,_article) => {
        let article = Article.findById(id);

        if(!article){
            throw {stutas:404,error:Msg.ARTICLE_NOT_EXIST_ERROR};
        }

        try {
            return await article.update(_article);
        } catch (error) {
            throw {stutas:400,error:Msg.UPDATE_ERROR};
        }
    },

    fetch: async (query = {}, skip = 1, limit = 10) => {
        return await Article.fetch(quey,skip,limit);
    },

    findById: async (id) => {
        return await Article.findById(id);
    },

    disable: async (id) => {
        let article = Article.findById(id);

        if(!article){
            throw {status:404,error:Msg.ARTICLE_NOT_EXIST_ERROR};
        }

        try {
            return await article.update({status:400,error:Msg.UPDATE_ERROR});
        } catch (error) {
            throw {stutas:400,error:Msg.UPDATE_ERROR};
        }
    }
}