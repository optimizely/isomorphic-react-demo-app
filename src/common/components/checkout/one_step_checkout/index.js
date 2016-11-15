import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AddressForm from '../common/address_form'
import CreditCardForm from '../common/credit_card_form'
import enums from '../../../utils/enums'
import React from 'react'
import * as ShoeActions from '../../../action_creators'

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ShoeActions, dispatch)
}

class OneStepCheckoutPage extends React.Component {
  completeCheckout() {
    this.props.completeCheckout()
      .then(() => {
        this.context.router.push('/')
      })
  }

  render() {
    return (
      <div>
        <div className="checkout-header caps">
          Shipping Address
        </div>
        <AddressForm/>
        <br/>
        <div className="checkout-header caps">
          Credit Card Info
        </div>
        <CreditCardForm/>

        <button className="cta-btn button" onClick={ this.completeCheckout.bind(this) }>
          Complete Checkout
        </button>
      </div>
    )
  }
}

OneStepCheckoutPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(OneStepCheckoutPage)
