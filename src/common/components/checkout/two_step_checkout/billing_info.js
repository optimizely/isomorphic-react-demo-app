import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CreditCardForm from '../common/credit_card_form'
import React from 'react'
import * as ShoeActions from '../../../action_creators'

function mapStateToProps(state, ownProps) {
  // add state here
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ShoeActions, dispatch)
}

class BillingInfoPage extends React.Component {
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
          2. Billing
        </div>
        <CreditCardForm />
        <button
          className="cta-btn button"
          onClick={ this.completeCheckout.bind(this) }>
          Complete Checkout
        </button>
      </div>
    )
  }
}

BillingInfoPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingInfoPage)
