import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ status, loggedIn, render, ...rest }) => {
  const renderDestination = (match, history) => {
    if (loggedIn) {
      if (status.admin) {
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

export default AdminRoute
