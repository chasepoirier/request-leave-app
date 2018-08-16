import React from 'react'
import PropTypes from 'prop-types'
import { Styled } from 'components'
import GoogleLogin from 'react-google-login'
import { auth } from 'config'
import { connect } from 'react-redux'
import { userOperations } from '../modules/ducks/user'

class Login extends React.Component {
  signout = () => {
    auth.signOut()
  }

  handleSubmit = googleUser => {
    const { submitLoginRequest } = this.props
    submitLoginRequest(googleUser)

    // const provider = new firebase.auth.GoogleAuthProvider()

    // provider.setCustomParameters({ prompt: 'select_account' })

    // auth.signInWithRedirect(provider)
  }

  render() {
    const { login } = this.props
    return (
      <Styled.PageWrapper>
        <Styled.Header>Login Page</Styled.Header>
        <GoogleLogin
          clientId="1025860778836-rp6ppospi7a9bcqut9n6jokt9n91c81s.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={this.handleSubmit}
          className="google-btn"
          prompt="select_account"
        />
        {login.errors && <div>{login.errors}</div>}
      </Styled.PageWrapper>
    )
  }
}

Login.defaultProps = {
  login: {
    success: false,
    errors: null
  }
}

Login.propTypes = {
  submitLoginRequest: PropTypes.func.isRequired,
  login: PropTypes.shape({
    errors: PropTypes.string,
    success: PropTypes.bool
  })
}

const mapStateToProps = state => ({
  login: state.user.login
})

export default connect(
  mapStateToProps,
  { submitLoginRequest: userOperations.submitLoginRequest }
)(Login)
