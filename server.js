const Glue = require('glue');
const Config = require("./config/config.json");

let env;

try {
  env = require("./.env.local.json").env;
} catch(err) {
  let help = ['.env.local.json not found', 'create .env.local.json and set your enviroment', ''];
  throw new Error(help.join('\n'))
}

Config.db = Config.db[env];
Confid.kide.path = path.join(__dirname, 'servers/kide/build');

const manifest = {
  connections: [{
    host: Config.server.web.host,
    port: Config.server.web.port,
    routes: {
      cors: true
    },
    labels: ['web']
  }, {
    host: Config.server.api.host,
    port: Config.server.api.port,
    routes: {
      cors: true
    },
    labels: ['api']
  }, {
    host: Config.server.run.host,
    port: Config.server.run.port,
    routes: {
      cors: true
    },
    labels: ['run']
  }],
  registrations: [{
    plugin: {
      register: './servers/web',
      options: {
        config: Config
      }
    },
    options: {
      select: ['web']
    }
  }, {
    plugin: {
      register: './servers/api',
      options: {
        config: Config
      }
    },
    options: {
      select: ['api']
    }
  }, {
    plugin: {
      register: './servers/run',
      options: {
        config: Config
      }
    },
    options: {
      select: ['run']
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
