/**
 * These action creators are only used client-side to react to user
 * interactions.
 */
import {
  ADD_TO_CART,
  CLEAR_CART,
  GET_CHECKOUT_FLOW,
} from '../actions'
import enums from '../utils/enums'
import optimizelyManager from '../../client/optimizely_manager'

function addToCartSuccess(item) {
  return {
    type: ADD_TO_CART,
    item,
  }
}

function getCheckoutFlowSuccess(checkoutFlowVariation) {
  return {
    type: GET_CHECKOUT_FLOW,
    checkoutFlowVariation,
  }
}

function completeCheckoutSuccess() {
  return {
    type: CLEAR_CART,
  }
}

/**
 * Add the given item to the user's cart
 * @param {string} userId We need the user id to track a conversion event
 * @param {Object} item The item we are adding to the cart
 * @return {Function}
 */
export function addToCart(item) {
  return function(dispatch, getState) {
    const userId = getState().currentUserId

    optimizelyManager.getInstance()
      .then((optimizelyInstance) => {
        optimizelyInstance.track(enums.EVENT_KEYS.ADD_TO_CART, userId)
        dispatch(addToCartSuccess(item))
      })
  }
}

/**
 *
 */
export function fetchItem(itemId) {
  return function(dispatch, getState) {
    // @TODO(mng): implement
  }
}

/**
 * Gets the checkout flow to use for checkout
 * @param  {string} userId User id needed to bucket the user and get the variation key
 * @return {Function}
 */
export function getCheckoutFlow() {
  return function(dispatch, getState) {
    const userId = getState().currentUserId
    optimizelyManager.getInstance()
      .then((optimizelyInstance) => {
        const checkoutFlowVariation = optimizelyInstance.getVariation(
          enums.EXPERIMENT_KEYS.CHECKOUT_FLOW_EXPERIMENT,
          userId
        )

        dispatch(getCheckoutFlowSuccess(checkoutFlowVariation))
      })
  }
}

/**
 * Activates the user in the checkout flow experiment
 * This tracks an impression event for the experiment
 * @param  {string} userId
 * @return {Function}
 */
export function activateCheckoutFlow() {
  return function(dispatch, getState) {
    const userId = getState().currentUserId
    optimizelyManager.getInstance()
      .then((optimizelyInstance) => {
        const checkoutFlowVariation = optimizelyInstance.activate(
          enums.EXPERIMENT_KEYS.CHECKOUT_FLOW_EXPERIMENT,
          userId
        )

        dispatch(getCheckoutFlowSuccess(checkoutFlowVariation))
      })
  }
}

/**
 * Tracks a checkout complete event for the given user
 * @param  {string} userId
 * @return {Function}
 */
export function completeCheckout() {
  return function(dispatch, getState) {
    const userId = getState().currentUserId
    return new Promise((resolve, reject) => {
      // compute the checkout total to send to the event
      const cart = getState().cart
      const itemsInCart = _.filter(getState().items, (item) => {
        return cart.indexOf(item.id) !== -1
      })
      const checkoutTotal = itemsInCart.reduce((subtotal, item) => {
        return subtotal + item.price
      }, 0)

      optimizelyManager.getInstance()
        .then((optimizelyInstance) => {
          optimizelyInstance.track(enums.EVENT_KEYS.CHECKOUT_COMPLETE, userId, null, checkoutTotal * 100)
          dispatch(completeCheckoutSuccess())
          resolve()
        })
    })
  }
}
