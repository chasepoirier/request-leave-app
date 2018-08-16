import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const NonAuthRoute = ({ loggedIn, render, ...rest }) => (
  <Route
    {...rest}
    render={({ match, history }) =>
      !loggedIn ? render(match, history) : <Redirect to="/" />
    }
  />
)

export default NonAuthRoute
