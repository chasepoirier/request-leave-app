import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const BasicRoute = ({ status, loggedIn, render, ...rest }) => {
  const renderDestination = (match, history) => {
    if (loggedIn) {
      return render(match, history)
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

export default BasicRoute
