import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Styled } from 'components'
import { adminOperations } from '../../../modules/ducks/admin'
import { supervisorOperations } from '../../../modules/ducks/supervisor'
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

  render() {
    const { status } = this.props
    return (
      <div>
        <Styled.Header>Approval Page</Styled.Header>
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
  team: state.user.info.team
})

export default connect(
  mapStateToProps,
  {
    fetchAdminPendingApprovals: adminOperations.fetchPendingApprovals,
    fetchSuperPendingApprovals: supervisorOperations.fetchPendingApprovals
  }
)(ApprovalPage)
