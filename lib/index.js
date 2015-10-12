// Load modules

var Hoek = require('hoek');
var Joi = require('joi');
var Mongoose = require('mongoose');
var Async = require('async');
var Path = require('path');
var Glob = require('glob');


// Declare internals

var internals = {
	schema: Joi.object({
		pattern: Joi.string().required(),	// Glob pattern
		options: Joi.object({				// Glob options
			cwd: Joi.string().required()
		}).unknown(true).required()
	})
};


exports.register = function (server, options, next) {

	var results = Joi.validate(options, internals.schema);
	Hoek.assert(!results.error, 'Invalid options ' + results.error);
	var settings = results.value;

	Glob(settings.pattern, settings.options, function (err, files) {

		Hoek.assert(!err, err);

		Async.each(files, function (file, callback) {

			var path = Path.resolve(settings.options.cwd, file);
			var module = require(path);
			var model = module

			if (module.hasOwnProperty('load') && typeof(module.load) === 'function') {
				model = module.load(server);
			}

			if (model.schema instanceof Mongoose.Schema) {
				server.expose(model.modelName, model);
				server.log('hapi-mongoose-models', 'Model `' + model.modelName + '` loaded');
			}
			else {
				server.log('hapi-mongoose-models', 'File `' + file + '` not ' +
						   'contains a mongoose model, will be ignored')
			}

			return Hoek.nextTick(callback)();
		}, next);
	});
};


exports.register.attributes = {
	pkg: require('../package.json')
};
