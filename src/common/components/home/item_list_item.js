import React from 'react'
import { Link } from 'react-router'

export default class ShoeListItem extends React.Component {
  render() {
    const item = this.props.item

    return (
      <li className="push--bottom" style={ listItemStyle }>
        <Link style={ {'color': '#222'} } to={ `/pdp/${item.id}` }>
          <img
            style={ listImageStyle }
            src={ `public/${item.image_url}` }
          />
          <div>{ item.name }</div>
          <div className="price">{ item.category }</div>
          <div className="price">${ item.price }</div>
        </Link>
      </li>
    )
  }
}

const listImageStyle = {
  height: '100px',
  width: '100px',
}

const listItemStyle = {
  'listStyle': 'none',
  'width': '200px',
  'float': 'left',
  'font-family': 'sans-serif'
}
