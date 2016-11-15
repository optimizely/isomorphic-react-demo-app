import React from 'react'

export default (props) => {
  return (
    <div className="checkout-section">
      <div className="checkout-section-inner">
        <div className="grid">
          <div className="grid__cell">
            <label>First Name</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
        <div className="grid">
          <div className="grid__cell">
            <label>Last Name</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
        <div className="grid">
          <div className="grid__cell">
            <label>Street Address</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
        <div className="grid">
          <div className="grid__cell">
            <label>City</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
        <div className="grid">
          <div className="grid__cell">
            <label>Country</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
        <div className="grid">
          <div className="grid__cell">
            <label>Zip</label>
          </div>
          <div className="grid__cell">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  )
}
