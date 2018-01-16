// Load modules

let Lab = require('lab');
let Hapi = require('hapi');
let Plugin = require('../lib');
const { expect, } = require('code');

// Tests

let lab = exports.lab = Lab.script();
var server;


lab.experiment(Plugin.pkg.name, () => {

    lab.before(async () => {

        server = Hapi.server({ port: 3000 });


        server.events.on('log', (event, tags) => {

            if (tags[Plugin.pkg.name]) {
                console.log(event.data);
            }
        });

        await server.register({
            plugin: Plugin,
            options: {
                globPattern: '../models/**/*.js',          // Required
                globOptions: {                          // https://github.com/isaacs/node-glob
                    cwd: __dirname,                     // Required
                    nosort: true                        // Optional, utils for mongoose descriptors
                }
            }
        });
        await server.start();
    });


    lab.test('tested valid plugin', () => {
        expect(server.plugins[Plugin.pkg.name]).to.be.an.object();
    });
    lab.test('tested valid models', () => {
        expect(server.plugins[Plugin.pkg.name].Normal).to.be.a.function();
        expect(server.plugins[Plugin.pkg.name].Withfunction).to.be.a.function();
    });
    lab.test('tested non-valid models', () => {
        expect(server.plugins[Plugin.pkg.name].Nomodel).to.be.undefined();
    });
});

