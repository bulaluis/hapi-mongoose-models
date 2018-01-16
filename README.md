# hapi-mongoose-models

Auto load mongoose models for Hapi.js

## Install

```bash
$ npm install hapi-mongoose-models
```

## Usage

```javascript
const Hapi = require('hapi');
const Mongoose = require('mongoose');
const server = Hapi.server({ port: 80 });

const provision = async () => {

    await server.register({
        plugin: require('hapi-mongoose-models'),
        options: {
            globPattern: './server/models/**/*.js', // Required
            globOptions: {                          // https://github.com/isaacs/node-glob
                cwd: __dirname,                     // Required
                nosort: true                        // Optional, utils for mongoose descriptors
            }
        }
    };

    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();

```

## Tests
Run comand `make test` or `npm test`. Include 100% test coverage.

# License
MIT
