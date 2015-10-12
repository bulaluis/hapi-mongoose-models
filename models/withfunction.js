// Load modules

var Mongoose = require('mongoose');


// Declare internals

var internals = {};


exports.load = internals.Model = function (server) {

	var schema = new Mongoose.Schema({
		name: String
	});

	return Mongoose.model('Withfunction', schema);
};
