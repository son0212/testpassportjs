const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email:String,
	password:String,
});

const users = mongoose.model('user',userSchema,'user');

module.exports = users;