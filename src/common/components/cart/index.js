import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import enums from '../../utils/enums'
import React from 'react'
import * as ShoeActions from '../../action_creators'

function mapStateToProps(state) {
  const items = _.filter(state.items, (item) => {
    return state.cart.indexOf(item.id) !== -1
  })

  return {
    items,
    checkoutFlow: state.optimizelyExperimentData[enums.EXPERIMENT_KEYS.CHECKOUT_FLOW_EXPERIMENT],
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ShoeActions, dispatch)
}

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCheckoutFlow()
  }

  render() {
    // determine whether to show one step or two step checkout when the user clicks on the checkout button
    const checkoutLink =
      this.props.checkoutFlow === enums.VARIATION_KEYS.TWO_STEP_CHECKOUT ?
      '/checkout/shipping' : '/checkout'
    const items = this.props.items
    const subtotal = items.reduce((subtotal, item) => {
      return subtotal + item.price
    }, 0)

    return (
      <div>
        <div className="grid">
          <div className="grid__cell">
            <div>
              <div className="cart-heading">YOUR CART ({ items.length })</div>
            </div>
            <div className="cart-content">
              <ul>
                {
                  items.map((item) => {
                    return (
                      <li className="soft-double" key={ item.id }>
                        <div className="grid">
                          <div className="grid__cell">
                            <img style={ {'width': '150px'} } src={ `public/${item.image_url}` }/>
                          </div>
                          <div className="grid__cell">
                            <span>{ item.name }</span>
                            <span className="float--right">${ item.price }</span>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className="cart-summary-column">
            <div className="cart-summary grid__cell soft-triple">
              <div className="push-double--bottom section-title">SUMMARY</div>
              <div>
                <span>Subtotal</span>
                <span className="float--right">${ subtotal }</span>
              </div>
              <hr className="rule"/>
              <div className="section-title">
                <span>Total</span>
                <span className="float--right">${ subtotal }</span>
              </div>
              <div className="push-double--top">
                <Link to={ checkoutLink }>
                  <button className="cta-btn button">Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
