# hapi-mongoose-models

Auto load mongoose models for Hapi.js

## Install

```bash
$ npm install hapi-mongoose-models
```

## Usage

```javascript
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: 8000 });

server.register({
        register: require('hapi-mongoose-models'),
        options: {
            pattern: './server/models/**/*.js',     // Required
            options: {
                cwd: __dirname,                     // Required
                nosort: true                        // Optional, utils for mongoose descriptors
            }
        }
    }, function (err) {

        if (err) {
            throw err;
        }

        server.start(function (err) {

            if (err) {
                throw err;
            }

            server.plugins['hapi-mongoose-models'].forEach(function (model) {
                // ...
            });

            console.log('Server started at: ' + server.info.uri);
        });
    }
});
```

## Tests
Run comand `make test` or `npm test`. Include 100% test coverage.

# License
MIT