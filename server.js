const Glue = require('glue');

const Config = require("./config.json");

const env = process.env.NODE_ENV || 'staging';

const manifest = {
  connections: [{
    host: Config[env].server.api.host,
    port: Config[env].server.api.port,
    labels: ['api']
  }],
  registrations: [{
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

  server.start(function() {
    console.log('Hapi days!');
  });
});
