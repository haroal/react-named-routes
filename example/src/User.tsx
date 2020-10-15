import React from 'react'
import { RouteComponentProps } from 'react-router-dom';

type RouteParams = {
  id: string
}

export default class User extends React.Component<RouteComponentProps<RouteParams>> {
  render () {
    return (
      <div>
        <p>This is the user page. ID: {this.props.match.params.id}</p>
      </div>
    )
  }
}
