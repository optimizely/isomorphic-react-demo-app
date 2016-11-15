import React from 'react'

export default (props) => {
  return (
    <div className="checkout-section">
      <div className="checkout-section-inner">
        <div className="grid">
          <div className="grid__cell">
            <label>CC Number</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
        <div className="grid">
          <div className="grid__cell">
            <label>Exp Date</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
        <div className="grid">
          <div className="grid__cell">
            <label>Security Code</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  )
}
