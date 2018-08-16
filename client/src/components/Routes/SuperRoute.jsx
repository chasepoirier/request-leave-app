import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const SuperRoute = ({ user, render, ...rest }) => {
  const renderDestination = (match, history) => {
    if (user) {
      if (user.super) {
        return render(match, history)
      }
      return <Redirect to="/" />
    }
    return <Redirect to="/login" />
  }

  return (
    <Route
      {...rest}
      render={({ match, history }) => renderDestination(match, history)}
    />
  )
}

export default SuperRoute
