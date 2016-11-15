import {
  ADD_TO_CART
} from '../actions'

const initialState = []

export default function items(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const cartItems = [...state]
      cartItems.push(action.item.id)

      return cartItems
    default:
      return state
  }
}
