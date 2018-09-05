import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { UserInfoPTs } from 'customPTs'
import { history as HistoryPTs } from 'react-router-prop-types'
import { Styled } from 'components'
import { connect } from 'react-redux'
import { requestOperations } from '../modules/ducks/requests'
import { viewOperations } from '../modules/ducks/view'
import { userOperations } from '../modules/ducks/user'
import RequestLeaveForm from './requestLeave/RequestLeaveForm'
import LeaveTable from '../components/LeaveTable/LeaveTable'

class RequestLeave extends React.Component {
  static propTypes = {
    user: UserInfoPTs.isRequired,
    submitNewRequest: PropTypes.func.isRequired,
    showStatusBar: PropTypes.func.isRequired,
    history: HistoryPTs.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  handleSubmitForm = request => {
    const {
      submitNewRequest,
      user,
      showStatusBar,
      history,
      fetchCurrentUser
    } = this.props
    submitNewRequest(user, request).then(success => {
      if (success) {
        showStatusBar('Successfully created new leave request')
        fetchCurrentUser()
        history.push('/request-status')
      }
    })
  }

  render() {
    const {
      submitting,
      updateLeaveAmount,
      user: { typeAmounts }
    } = this.props
    return (
      <Styled.PageWrapper>
        <Styled.Header style={{ marginTop: 50 }}>
          Create New Leave Request
        </Styled.Header>
        <LeaveTable />
        <RequestLeaveForm
          submitting={submitting}
          handleSubmitForm={this.handleSubmitForm}
          updateLeaveAmount={updateLeaveAmount}
          typeAmounts={typeAmounts}
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
      showStatusBar: viewOperations.showStatusBar,
      updateLeaveAmount: userOperations.updateLeaveAmount,
      fetchCurrentUser: userOperations.fetchCurrentUser
    }
  )(RequestLeave)
)
