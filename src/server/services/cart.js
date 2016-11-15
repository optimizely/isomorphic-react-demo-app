const userCartMapping = {};

/**
 * Stub cart service.
 * Stores everything in memory at the moment.
 * @type {Object}
 */
module.exports = {
  /**
   * Add product to the user's cart
   * @param  {string} userId
   * @param  {string} productId
   * @param  {Number} quantity
   */
  addToCart: (userId, productId, quantity) => {
    if (userCartMapping.hasOwnProperty(userId)) {
      let cart = userCartMapping[userId];
      cart.push({
        productId,
        quantity,
      });
    } else {
      userCartMapping[userId] = [
        {
          productId,
          quantity,
        }
      ];
    }
  },

  /**
   * Get the given user's cart
   * @param  {string} userId
   * @return {Object}
   */
  getCart: (userId) => {
    return userCartMapping[userId];
  },
};
