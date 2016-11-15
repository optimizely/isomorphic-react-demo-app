import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from '../containers/app'

import Cart from '../components/cart'
import BillingPage from '../components/checkout/two_step_checkout/billing_info'
import Checkout from '../components/checkout'
import Home from '../components/home'
import OneStepCheckout from '../components/checkout/one_step_checkout'
import ProductDetailPage from '../components/pdp'
import ShippingPage from '../components/checkout/two_step_checkout/shipping_address'

export const reactRoutes =
(
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="pdp/:id" component={ ProductDetailPage } />
    <Route path="cart" component={ Cart } />
    <Route path="checkout" component={ Checkout }>
      <IndexRoute component={ OneStepCheckout } />
      <Route path="shipping" component={ ShippingPage } />
      <Route path="billing" component={ BillingPage } />
    </Route>
  </Route>
)
