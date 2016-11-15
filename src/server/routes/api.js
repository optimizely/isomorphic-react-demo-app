import { COOKIE_KEYS } from '../../common/utils/enums'
import cartService from '../services/cart'
import itemService from '../services/items'

/**
 * Add the given product to the user's cart
 * @param {Object} request
 * @param {Function} reply
 */
function addToCartHandler(request, reply) {
  const user = request.yar.get(COOKIE_KEYS.USER)
  const payload = request.payload
  const productId = payload.productId
  const quantity = payload.quantity
  cartService.addToCart(user.key, productId, quantity)
  reply({
    success: true,
  });
}

/**
 * Get the user's cart
 * @param {Object} request
 * @param {Function} reply
 */
function getCartHandler(request, reply) {
  const user = request.yar.get(COOKIE_KEYS.USER)
  const cart = cartService.getCart(user.key)
  reply(cart)
}

/**
 * Get the item by id
 * @param {Object} request
 * @param {Function} reply
 */
function itemHandler(request, reply) {
  const itemId = request.params.id
  const item = cartService.getShoe(itemId)
  reply(item)
}

/**
 * Routes API calls
 * @type {Array}
 */
function itemsHandler(request, reply) {
  const items = itemService.getShoes()
  return reply(items)
}

export default [
  {
    method: 'GET',
    path: '/api/cart',
    handle: getCartHandler,
  },
  {
    method: 'POST',
    path: '/api/cart',
    handler: addToCartHandler,
  },
  {
    method: 'GET',
    path: '/api/item/{id}',
    handler: itemHandler,
  },
  {
    method: 'GET',
    path: '/api/items',
    handler: itemsHandler,
  },
];
