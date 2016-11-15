import Hapi from 'hapi'
import Inert from 'inert'
import path from 'path'

const server = new Hapi.Server({
  connections: {
    routes: {
      cors: {
        origin: ['*'],
      },
      files: {
        relativeTo: path.join(__dirname, '../public'),
      },
    },
  },
});

server.connection({
  host: 'localhost',
  port: '4242',
});

const plugins = [
  Inert,
  require('./server/routes/index'),
];

server.register(plugins, function(err) {
  if (err) {
    throw err;
  }
});

module.exports = {
  server,
};
