// Load modules

const Hoek = require('hoek');
const Joi = require('joi');
const Mongoose = require('mongoose');
const Path = require('path');
const globby = require('globby');


// Declare internals

const internals = {};

internals.schema = Joi.object({
    globPattern: Joi.string().required(),
    globOptions: Joi.object({
        cwd: Joi.string().required()
    }).unknown(true).required()
});

internals.pkg = require('../package.json');

internals.mapFileToPromise = (cwd, file, server) => {
    return new Promise((resolve) => {
            let path = Path.resolve(cwd, file);
            let module = require(path);
            let model = module;
            if (module.hasOwnProperty('load') && typeof(module.load) === 'function') {
                model = module.load(server);
            }
    
            if (model.schema instanceof Mongoose.Schema) {
                server.expose(model.modelName, model);
                resolve(`Model '${model.modelName}' loaded`);
            }
            else {
                resolve(`File '${file}' does not contains a mongoose model, will be ignored`);
            }
            
    });
};

module.exports = {
    pkg: internals.pkg,
    register: async (server, options) => {
        options = Hoek.applyToDefaults({}, options);
        let results = Joi.validate(options, internals.schema);
        Hoek.assert(!results.error, results.error);
        let settings = results.value;    
        return globby(settings.globPattern, settings.globOptions)
        .then((files) => {
            return Promise.all(files.map(file => internals.mapFileToPromise(settings.globOptions.cwd, file, server)));
        }).then((messages) => {            
            messages.forEach(message => server.log([internals.pkg.name, 'plugin'], message));            
        }).catch((err) => {            
            server.log([internals.pkg.name, 'plugin'], err);
        });
    }
};
