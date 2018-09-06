import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userOperations, userSelectors } from '../../modules/ducks/user'
import {
  PopupWrapper,
  PopupContainer,
  ContentContainer,
  CloseContainer,
  Header,
  SubHeader,
  CloseIcon,
  LogsContainer,
  Log,
  LogHeader,
  LogTimestamp,
  LogSubheader
} from './Styled'

class LogsPopup extends React.Component {
  componentWillMount() {
    const { fetchUserLogs, id } = this.props
    fetchUserLogs(id)
  }

  render() {
    const { closePopup, logs } = this.props
    return (
      <PopupContainer>
        <PopupWrapper style={{ height: 'auto', width: '90%' }}>
          <CloseIcon
            onClick={() => closePopup(false)}
            className="far fa-times-circle"
          />
          <ContentContainer>
            <Header>User Logs</Header>
            <SubHeader>All Logs</SubHeader>

            {logs.loading ? (
              <div>loading logs...</div>
            ) : (
              <LogsContainer>
                {userSelectors.sortLogsByDate(logs.all).map(log => (
                  <LogItem
                    key={log.timestamp}
                    timestamp={log.timestamp}
                    desc={log.logType}
                  />
                ))}
              </LogsContainer>
            )}
          </ContentContainer>
        </PopupWrapper>
        <CloseContainer onClick={closePopup} />
      </PopupContainer>
    )
  }
}

const parseStart = str => str.substring(0, str.indexOf(':'))
const parseEnd = str => str.substring(str.indexOf(':') + 1)
// desc.substring(0, desc.indexOf(':'))
const LogItem = ({ desc, timestamp }) => {
  console.log(desc)
  return (
    <Log>
      <LogHeader>{parseStart(desc)}</LogHeader>
      <LogSubheader>{parseEnd(desc)}</LogSubheader>
      <LogTimestamp>{moment(timestamp).format('MMMM Do YYYY')}</LogTimestamp>
    </Log>
  )
}

const { func } = PropTypes

LogsPopup.defaultProps = {
  handleSubmit: null
}

LogsPopup.propTypes = {
  closePopup: func.isRequired
}

const mapStateToProps = state => ({
  handleSubmit: state.view.popup.content.handleSubmit,
  logs: state.user.logs
})

export default connect(
  mapStateToProps,
  {
    fetchUserLogs: userOperations.getUserLogsRequest
  }
)(LogsPopup)
