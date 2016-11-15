import { Link } from 'react-router'
import AddressForm from '../common/address_form'
import React from 'react'

export default (props) => {
  return (
    <div>
      <div className="checkout-header caps">
        1. Shipping
      </div>
      <AddressForm />
      <Link to="/checkout/billing">
        <button className="cta-btn button">Next</button>
      </Link>
    </div>
  )
}
