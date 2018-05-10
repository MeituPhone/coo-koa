/**
 * mongo 配置
 * Created by 王佳欣 on 2018/5/2.
 */

import Mongoose from 'mongoose';
import lastModifiedPlugin from '../dao/utils/lastMod';

Mongoose.connect('mongodb://127.0.0.1:12345/imooc');

Mongoose.plugin(lastModifiedPlugin);