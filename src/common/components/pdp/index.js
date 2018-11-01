import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import React, { PropTypes } from 'react'
import * as ShoeActions from '../../action_creators'

function mapStateToProps(state, ownProps) {
  const itemId = parseInt(ownProps.params.id, 10)
  const item = _.find(state.items, (_item) => {
    return _item.id === itemId
  })

  return {
    itemId,
    item,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ShoeActions, dispatch)
}

class ProducDetailPage extends React.Component {
  addToCart() {
    this.props.addToCart(this.props.item)
    this.context.router.push('/cart')
  }

  componentDidMount() {
    this.props.fetchShoe && this.props.fetchShoe(this.props.itemId)
  }

  render() {
    const item = this.props.item
    return (
      <div className="push">
        <div className="back-link-container">
          <Link className="back-link" to={ '/' }>
            Back to Product list
          </Link>
        </div>
        <div style={ {'font-family': 'sans-serif'} }>
          <img
            style={ imageStyle }
            src={ `/images/${item.image_url}` }
          />
          <div>{ item.name }</div>
          <div className="price">{ item.category }</div>
          <div className="price">${ item.price }</div>
          <button
            className="button cta-btn"
            onClick={ this.addToCart.bind(this) }>
            Add to cart
          </button>
        </div>
      </div>
    )
  }
}

ProducDetailPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducDetailPage)

const imageStyle = {
  height: '150px',
  width: '150px',
}
