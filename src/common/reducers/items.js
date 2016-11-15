import {
  FETCH_ITEMS
} from '../actions'

export default function items(state = {}, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      return action.payload
    default:
      return state
  }
}
