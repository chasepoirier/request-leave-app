import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Styled } from 'components'
import { adminOperations } from '../../../modules/ducks/admin'
import { supervisorOperations } from '../../../modules/ducks/supervisor'
import { viewOperations } from 'modules/ducks/view'
import AdminTable from './AdminTable'
import SuperTable from './SuperTable'

class ApprovalPage extends React.Component {
  componentDidMount() {
    const {
      status,
      fetchAdminPendingApprovals,
      fetchSuperPendingApprovals,
      team
    } = this.props

    if (status.supervisor) {
      fetchSuperPendingApprovals()
    } else {
      fetchAdminPendingApprovals(team)
    }
  }

  handleApproveAll = () => {
    const { status, pendingAdmin, pendingSupervisor, showPopup } = this.props

    if (status.supervisor) {
      if (pendingSupervisor.length !== 0) {
        showPopup({
          type: 'danger',
          content: {
            title: 'Confirm Approval.',
            desc: `Are you sure you want to approve all requests?`,
            buttonText: `Approve All`,
            handleSubmit: this.superApproveAll.bind({}, pendingSupervisor)
          }
        })
      }
    } else {
      if (pendingAdmin.length !== 0) {
        showPopup({
          type: 'danger',
          content: {
            title: 'Confirm Approval.',
            desc: `Are you sure you want to approve all requests?`,
            buttonText: `Approve All`,
            handleSubmit: this.adminApproveAll.bind({}, pendingAdmin)
          }
        })
      }
    }
  }

  superApproveAll = requests => {
    const promises = []
    requests.forEach(request => {
      const { userUid, teamUid, id, teamId } = request
      promises.push(
        this.props.superApproveAll(
          { userUid, teamUid, id, teamID: teamId },
          true
        )
      )
    })
    Promise.all(promises).then(() => window.location.reload())
  }

  adminApproveAll = requests => {
    const promises = []
    requests.forEach(request => {
      const { userUid, teamUid, id, teamId } = request
      promises.push(
        this.props.adminApproveAll(
          { userUid, teamUid, id, teamID: teamId },
          true
        )
      )
    })
    Promise.all(promises).then(() => window.location.reload())
  }

  render() {
    const { status } = this.props
    return (
      <div>
        <Styled.FlexBetween>
          <Styled.Header>Approve Page</Styled.Header>
          <Styled.ButtonFilled
            onClick={this.handleApproveAll}
            style={{ margin: 0 }}
          >
            Approval All
          </Styled.ButtonFilled>
        </Styled.FlexBetween>
        {status.supervisor ? <SuperTable /> : <AdminTable />}
      </div>
    )
  }
}

const { objectOf, func, bool, string } = PropTypes

ApprovalPage.propTypes = {
  status: objectOf(bool).isRequired,
  fetchAdminPendingApprovals: func.isRequired,
  fetchSuperPendingApprovals: func.isRequired,
  team: string.isRequired
}

const mapStateToProps = state => ({
  status: state.user.info.status,
  team: state.user.info.team,
  pendingSupervisor: state.supervisor.pendingApprovals.all,
  pendingAdmin: state.admin.pendingApprovals.all
})

export default connect(
  mapStateToProps,
  {
    fetchAdminPendingApprovals: adminOperations.fetchPendingApprovals,
    fetchSuperPendingApprovals: supervisorOperations.fetchPendingApprovals,
    superApproveAll: supervisorOperations.submitApprovalStatus,
    adminApproveAll: adminOperations.submitApprovalStatus,
    showPopup: viewOperations.showPopup
  }
)(ApprovalPage)
