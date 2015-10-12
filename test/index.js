// Load modules

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');
var Plugin = require('../lib');


// Tests

var lab = exports.lab = Lab.script();
var server;


lab.before(function (done) {

	server = new Hapi.Server();
	server.connection({ port: 3000 });
	server.register({
		register: Plugin,
		options: {
			pattern: '../models/**/*.js',
			options: {
				cwd: __dirname
			}
		}
	}, function (err) {

		if (err) {
			return done(err);
		}

		return done();
	});
});


lab.experiment('Hapi-mongoose-models', function () {

	lab.test('it returns models', function (done) {

		Code.expect(server.plugins['hapi-mongoose-models']).to.be.an.object();
		Code.expect(server.plugins['hapi-mongoose-models'].Normal).to.be.a.function();
		Code.expect(server.plugins['hapi-mongoose-models'].Withfunction).to.be.a.function();
		Code.expect(server.plugins['hapi-mongoose-models'].Nomodel).to.be.undefined();

		return done();
	});
});
