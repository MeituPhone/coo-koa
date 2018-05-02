import Mongoose from 'mongoose';
import AdministratorSchema from '../schemas/administrator';

let Administrator = Mongoose.model('administrator', AdministratorSchema);

module.exports = Administrator;