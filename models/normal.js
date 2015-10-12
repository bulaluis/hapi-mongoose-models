// Load modules

var Mongoose = require('mongoose');


// Model

var schema = new Mongoose.Schema({
	name: String
});

exports = module.exports = Mongoose.model('Normal', schema);
