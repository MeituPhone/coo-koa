import Mongoose from 'mongoose';
import UserSchema from '../schemas/user';

let User = Mongoose.model('user', UserSchema);

module.exports = User;