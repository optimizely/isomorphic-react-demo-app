import React from 'react'
import Header from '../components/shared/header'

export default class App extends React.Component {
  render() {
    return (
      <div className="push">
        <Header root={ this.props.route.path } />
        { this.props.children }
      </div>
    );
  }
}
