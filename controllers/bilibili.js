import Axios from 'axios';

// 接口转发获取ding
let ding = async (ctx, next) => {
    let response = await Axios.get(`http://www.bilibili.com/index/ding.json`);
    ctx.body = response.data;
};

module.exports = {
    ding
};