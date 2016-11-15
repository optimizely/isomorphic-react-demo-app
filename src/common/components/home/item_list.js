import React from 'react'
import ItemListItem from './item_list_item'

export default class ShoeListComponent extends React.Component {
  render() {
    const items = this.props.items
    return (
      <ul>
        {
          Object.keys(items).map((itemId) => {
            return (
              <ItemListItem
                key={ itemId }
                item={ items[itemId] }
              />
            )
          })
        }
      </ul>
    )
  }
}
