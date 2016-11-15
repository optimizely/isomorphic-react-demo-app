import _ from 'lodash'

const itemsData = [
  { id: 1, name: 'Long Sleeve Swing Shirt', 'color': 'Baby Blue', category: 'Shirts', price: 54, image_url: 'item_7.png' },
  { id: 2, name: 'Bo Henry', 'color': 'Khaki', category: 'Shorts', price: 37, image_url: 'item_2.png' },
  { id: 3, name: 'The "Go" Bag', 'color': 'Forest Green', category: 'Bags', price: 118, image_url: 'item_3.png' },
  { id: 4, name: 'Springtime', 'color': 'Rose', category: 'Dresses', price: 84, image_url: 'item_4.png' },
  { id: 5, name: 'The Night Out', 'color': 'Olive Green', category: 'Dresses', price: 153, image_url: 'item_5.png' },
  { id: 6, name: 'Dawson Trolley', 'color': 'Pine Green', category: 'Shirts', price: 107, image_url: 'item_6.png' },
  { id: 7, name: 'Derby Hat', 'color': 'White', category: 'Hats', price: 100, image_url: 'item_1.png' },
  { id: 8, name: 'Long Sleever Tee', 'color': 'Baby Blue', category: 'Shirts', price: 62, image_url: 'item_8.png' },
  { id: 9, name: 'Simple Cardigan', 'color': 'Olive Green', category: 'Sweaters', price: 238, image_url: 'item_9.png' },
]

module.exports = {
  /**
   * Get items and sort by the given property
   * @param {string} sortBy Determines the property to sort the items on
   * @return {Array<Object>}
   */
  getItems: function(sortBy) {
    return _.chain(itemsData)
            .cloneDeep()
            .keyBy('id')
            .sortBy(sortBy)
            .value()
  },

  /**
   * Get item by Id
   * @param  {string} itemId
   * @return {Object}
   */
  getItem: function(itemId) {
    return _.chain(itemsData)
            .cloneDeep()
            .find(item => item.id === itemId)
            .value()
  },
}
