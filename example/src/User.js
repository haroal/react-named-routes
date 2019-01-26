import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class User extends Component {
  render () {
    return (
      <div>
        <p>This is the user page. ID: {this.props.match.params.id}</p>
      </div>
    )
  }
}

User.propTypes = {
  match: PropTypes.object
}
