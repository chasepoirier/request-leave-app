import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const NonAuthRoute = ({ user, render, ...rest }) => (
  <Route
    {...rest}
    render={({ match, history }) =>
      !user ? render(match, history) : <Redirect to="/" />
    }
  />
)

export default NonAuthRoute
