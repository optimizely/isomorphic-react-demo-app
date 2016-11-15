import Promise from 'bluebird'
import enums from '../common/utils/enums'
import optimizely from 'optimizely-client-sdk'
import optimizelyLoggerFactory from 'optimizely-server-sdk/lib/plugins/logger'

const PROJECT_ID = enums.PROJECT_ID
const PROJECT_JSON_URL = `https://cdn.optimizely.com/json/${PROJECT_ID}.json`

// Singleton instance of the optimizely object
var optlyInstance;

// In-memory copy of the datafile. We could also keep this in some form of cache like redis or memcached
var datafile;

module.exports = {
  /**
   * Get the singleton instance.
   * @return {Object} the optimizely instance
   */
  getInstance(fetchDatafile) {
    return new Promise((resolve, reject) => {
      // check if we have a datafile or if we are forced to re-fetch it
      if (!datafile || fetchDatafile) {
        getDatafile()
          .then((fetchedDatafile) => {
            datafile = fetchedDatafile
            var instance = _getInstance(fetchedDatafile)
            resolve(instance)
          })
      } else {
        var instance = _getInstance(datafile)
        resolve(instance)
      }
    });
  }
}

function _getInstance(datafile) {
  if (!optlyInstance) {
    optlyInstance = optimizely.createInstance({
      datafile,
      logger: optimizelyLoggerFactory.createLogger({
        logLevel: 2,
      }),
      skipJSONValidation: true, // This should be set to false if we modify the datafile in any way
    })
  }
  return optlyInstance
}

function getDatafile() {
  return new Promise((resolve, reject) => {
    // Try to grab it from the global var before attempting an XHR request.
    // @NOTE: In a prod environment we probably don't want to do this and instead
    // grab it from the CDN. It can be a non-blocking deferred request though
    // because we've got server-side rendering.
    if (window.__OPTIMIZELY_DATAFILE__) {
      resolve(window.__OPTIMIZELY_DATAFILE__)
    } else {
      fetch(PROJECT_JSON_URL, { mode: 'cors' })
        .then((response) => {
          resolve(response.json())
        })
    }
  })
}
