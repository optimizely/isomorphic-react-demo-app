import { combineReducers } from 'redux'
import cart from './cart'
import optimizelyExperimentData from './optimizely_experiment_data'
import items from './items'

const rootReducer = combineReducers({
  cart,
  currentUserId: (state = {}) => state,
  optimizelyExperimentData,
  items,
})

export default rootReducer
