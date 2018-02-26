let mongoose = require('mongoose');
let UserSchema = require('../schemas/user');

let User = mongoose.model('user', UserSchema);

module.exports = User;