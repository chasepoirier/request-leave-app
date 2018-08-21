import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { UserInfoPTs } from 'customPTs'
import { history as HistoryPTs } from 'react-router-prop-types'
import { Styled } from 'components'
import { connect } from 'react-redux'
import { requestOperations } from '../modules/ducks/requests'
import { viewOperations } from '../modules/ducks/view'
import RequestLeaveForm from './requestLeave/RequestLeaveForm'

class RequestLeave extends React.Component {
  static propTypes = {
    user: UserInfoPTs.isRequired,
    submitNewRequest: PropTypes.func.isRequired,
    showStatusBar: PropTypes.func.isRequired,
    history: HistoryPTs.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  handleSubmitForm = request => {
    const { submitNewRequest, user, showStatusBar, history } = this.props
    submitNewRequest(user, request).then(success => {
      if (success) {
        showStatusBar('Successfully created new leave request')
        history.push('/request-status')
      }
    })
  }

  render() {
    const { submitting } = this.props
    return (
      <Styled.PageWrapper>
        <Styled.Header style={{ marginTop: 50 }}>
          Create New Leave Request
        </Styled.Header>
        <RequestLeaveForm
          submitting={submitting}
          handleSubmitForm={this.handleSubmitForm}
        />
      </Styled.PageWrapper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.info,
  submitting: state.requests.addRequest.submitting
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      submitNewRequest: requestOperations.submitRequestLeave,
      showStatusBar: viewOperations.showStatusBar
    }
  )(RequestLeave)
)
