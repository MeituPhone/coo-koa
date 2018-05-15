/**
 * 管理员控制器
 * Created by 王佳欣 on 2018/4/28.
 */
import MSG from '../../consts/msg';
import easyH5Handle from'../../dao/handle/h5/easyH5';

// 创建管理员
let create = async (ctx, next) => {
    let { name, type, content } = ctx.request.body;

    await easyH5Handle.create({name, type, content}).then((result) => {
        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        ctx.body = JSON.stringify({
            error
        });
    });
};

// 删除管理员
let remove = async (ctx, next) => {
    let {id} = ctx.params;
    await easyH5Handle.remove(id).then((result) => {
        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        ctx.body = JSON.stringify({
            error: {
                ...MSG.REMOVE_ERROR
            }
        });
    });
};

// 更新信息
let update = async (ctx, next) => {
    let {name, content} = ctx.request.body;
    let {id} = ctx.params;

    let data = {_id: id};
    let condition = {name, content};

    await easyH5Handle.update({condition, data}).then((result) => {
        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        ctx.body = JSON.stringify({
            error: {
                ...MSG.UPDATE_ERROR
            }
        });
    });
};

// 根据id获取用户
let get = async (ctx, next) => {
    let {id} = ctx.params;

    await easyH5Handle.findById(id).then((result) => {
        if (!result) {
            return ctx.body = JSON.stringify({});
        }

        ctx.body = JSON.stringify(result);
    }).catch((error) => {
        ctx.body = JSON.stringify({error});
    });
};

// 列表
let list = async (ctx, next) => {
    let {page = 1, per_page = 10} = ctx.request.query;
    let skip = (page - 1) * per_page;

    await easyH5Handle.fetch({}, skip, per_page).then((result) => {
        ctx.body = JSON.stringify(result || []);
    }).catch(error => {
        ctx.body = JSON.stringify({error});
    });
};

module.exports = {
    create,
    remove,
    update,
    get,
    list
};
