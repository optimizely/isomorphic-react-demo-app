import {
  GET_CHECKOUT_FLOW
} from '../actions'
import enums from '../utils/enums'

const initialState = {}

export default function optimizelyExperimentData(state = initialState, action) {
  switch (action.type) {
    case GET_CHECKOUT_FLOW:
      return {
        ...state,
        [enums.EXPERIMENT_KEYS.CHECKOUT_FLOW_EXPERIMENT]: action.checkoutFlowVariation,
      }
  }
  return initialState
}
