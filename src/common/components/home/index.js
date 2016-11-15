import { connect } from 'react-redux'
import React, { PropTypes } from 'react'
import ItemList from './item_list'

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ItemList
            items={ this.props.items }
          />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)
