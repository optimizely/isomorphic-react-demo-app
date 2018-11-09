/**
 * Wrapper around the server side SDK.
 * Manages the optimizely instance as well as the datafile download.
 */
import Promise from 'bluebird'
import enums from './enums'
import optimizely from '@optimizely/optimizely-sdk'
import optimizelyLoggerFactory from '@optimizely/optimizely-sdk/lib/plugins/logger'
import requestPromise from 'request-promise'

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
  },

  /**
   * Returns the cached datafile
   * @return {Object}
   */
  getDatafile() {
    return datafile
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
  return requestPromise({
    url: PROJECT_JSON_URL,
    json: true,
  })
}
