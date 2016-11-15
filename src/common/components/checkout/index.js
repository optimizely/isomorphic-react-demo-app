import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import * as ShoeActions from '../../action_creators'

function mapStateToProps(state, ownProps) {
  // add state here
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ShoeActions, dispatch)
}

class CheckoutPage extends React.Component {
  componentDidMount() {
    // activate the user (track an impression if not already tracked)
    this.props.activateCheckoutFlow()
  }

  render() {
    return (
      <div>
        <h1 className="text--center">Checkout</h1>
        { this.props.children }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
