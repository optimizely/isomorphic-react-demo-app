// needed for babel to transpile the JSX
require('babel-core/register')({
    presets: ['es2015', 'react', 'stage-2']
})

const server = require('./').server;

server.start((err) => {
  if (err) {
      throw err;
  }
  console.log('Server running at:', server.info.uri);
});
