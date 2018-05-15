import Mongoose from 'mongoose';
import EasyH5Schema from '../../schemas/h5/easyH5';

let EasyH5 = Mongoose.model('easyH5', EasyH5Schema);

module.exports = EasyH5;
