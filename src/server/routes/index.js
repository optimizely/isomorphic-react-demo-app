import vision from 'vision'
import yar from 'yar'

import staticRoutes from './static'
import viewRoutes from './views'

const register = function(server, options, next) {
  server.register([vision, {
    register: yar,
    options: {
      storeBlank: false,
      cookieOptions: {
        password: 'the-password-must-be-at-least-32',
        isSecure: false
      }
    }
  }], function(err) {
    if (err) {
      throw err
    }

    const routes = [].concat(staticRoutes, viewRoutes)
    server.route(routes)
  })

  next()
}

register.attributes = {
  name: 'default-routes',
}

module.exports = register
