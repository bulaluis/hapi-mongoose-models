# hapi-mongoose-models

Auto load mongoose models for Hapi.js

## Install

```bash
$ npm install hapi-mongoose-models
```

## Usage

```javascript
var Hapi = require('hapi');
var Mongoose = require('mongoose');
var server = new Hapi.Server();
server.connection({ port: 8000 });

server.register({
        register: require('hapi-mongoose-models'),
        options: {
            globPattern: './server/models/**/*.js', // Required
            globOptions: {                          // https://github.com/isaacs/node-glob
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

            // Now you can load model
            var model = server.plugins['hapi-mongoose-models'].User;

            // or
            var model = Mongoose.model('User');

            console.log('Server started at: ' + server.info.uri);
        });
    }
});
```

## Tests
Run comand `make test` or `npm test`. Include 100% test coverage.

# License
MIT
