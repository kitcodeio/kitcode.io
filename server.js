const Glue = require('glue');
const Config = require("./config/config.json");
const env = process.env.NODE_ENV || 'beta';

const manifest = {
  connections: [{
    host: Config[env].server.web.host,
    port: Config[env].server.web.port,
    routes: {
      cors: true
    },
    labels: ['web']
  }, {
    host: Config[env].server.api.host,
    port: Config[env].server.api.port,
    routes: {
      cors: true
    },
    labels: ['api']
  }],
  registrations: [{
    plugin: {
      register: './servers/web',
      options: {
        config: Config[env]
      }
    },
    options: {
      select: ['web']
    }
  }, {
    plugin: {
      register: './servers/api',
      options: {
        config: Config[env]
      }
    },
    options: {
      select: ['api']
    }
  }]
};

const options = {
  relativeTo: __dirname,
};

Glue.compose(manifest, options, function(err, server) {
  if (err) {
    throw err;
  }
  server.start(function(err) {
    if (err) throw err;
    console.log('Hapi days!');
  });
});
