/**
 * Routes for serving static assets
 * @type {Array}
 */
export default [
  {
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true
      }
    }
  },
  {
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: '.',
        index: false,
        listing: false,
      }
    }
  },
]
