import React from 'react';
import { IndexLink } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header className="app-header push-double--bottom">
        <h1>
          <IndexLink className="title" to={ this.props.root }>Attic and Button</IndexLink>
        </h1>
      </header>
    )
  }
}
