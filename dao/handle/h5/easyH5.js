import EasyH5 from '../../models/h5/easyH5';

export default {
    // 增加数据
    create: async ({name, type, content}) => {
        let _easyH5 = new EasyH5({
            name,
            type,
            content
        });

        return new Promise((resolve, reject) => {
            _easyH5.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(_easyH5);
                }
            });
        });
    },
    remove: (id) => {
        return EasyH5.removeById(id);
    },
    // 修改
    update: ({condition, data}) => {
        return EasyH5.updateInclude({condition, data});
    },
    // 获取
    fetch: function(query = {}, skip, limit) {
        return EasyH5.fetch(query, skip, limit);
    },
    findById: async function (id) {
        return await EasyH5.findById(id);
    }
};