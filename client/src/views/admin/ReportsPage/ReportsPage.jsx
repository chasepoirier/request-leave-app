import React from 'react'
import ReactToPrint from 'react-to-print'
import { connect } from 'react-redux'
import { Styled } from 'components'
import { adminOperations, adminSelectors } from 'modules/ducks/admin'
import { userOperations, userSelectors } from 'modules/ducks/user'
import { TeamsContainer, FlexWrapper } from './Styled'
import ResultRow from './ResultRow'
import TableLoadingState from '../../../components/LoadingStates/TableLoadingState'
import SearchParameters from './SearchParameters'
import PrintedComponent from './PrintedComponent'
import Filters from './Filters'

class ReportsPage extends React.Component {
  state = {
    searchInitiated: false,
    users: [],
    filterType: '',
    queries: {
      users: [],
      types: [],
      teams: [],
      startDate: '',
      endDate: ''
    }
  }

  componentWillMount() {
    this.props.getAllUsers()
  }

  componentDidUpdate(prevProps) {
    const { loading, all } = this.props.users
    if (prevProps.users.loading !== loading && !loading) {
      this.setState({ users: userSelectors.listOfNamesWithIds(all) })
    }
  }

  updateQuery = (type, data) => {
    const { queries } = this.state
    this.setState({ queries: { ...queries, [type]: data } })
  }

  handleQueryResults = () => {
    this.setState({ searchInitiated: true })
    this.props.queryRequests(this.state.queries)
  }

  renderResults = results =>
    results.map(result => <ResultRow data={result} key={result.timestamp} />)

  handleFilterChange = e => {
    this.setState({ filterType: e.target.value })
  }

  render() {
    const { requests, leaveTypes, teams } = this.props

    console.log(this.state.queries)
    return (
      <TeamsContainer>
        <Styled.Header>Generate a Report</Styled.Header>

        <SearchParameters
          users={this.state.users}
          leaveTypes={leaveTypes.all}
          updateQuery={this.updateQuery}
          teams={teams.all}
        />
        <FlexWrapper>
          <Styled.ButtonFilled
            style={{ width: 'calc(50% - 15px)', margin: 0 }}
            onClick={this.handleQueryResults}
          >
            Search
          </Styled.ButtonFilled>
          <ReactToPrint
            trigger={() => (
              <Styled.ButtonFilled
                style={{ width: 'calc(50% - 15px)', margin: 0 }}
                disabled={!this.state.searchInitiated}
              >
                Print Results
              </Styled.ButtonFilled>
            )}
            content={() => this.componentRef}
          />
        </FlexWrapper>
        {this.state.searchInitiated ? (
          <div>
            {!requests.submitting ? (
              <div>
                <Filters
                  value={this.state.filterType}
                  toggleFilter={this.handleFilterChange}
                />
                <PrintedComponent
                  ref={el => (this.componentRef = el)}
                  requests={adminSelectors.filterRequests(
                    this.state.filterType,
                    requests.all
                  )}
                />
              </div>
            ) : (
              <TableLoadingState>Fetching results...</TableLoadingState>
            )}
          </div>
        ) : (
          <TableLoadingState>Perform a search</TableLoadingState>
        )}
      </TeamsContainer>
    )
  }
}

const mapStateToProps = state => ({
  requests: state.admin.reports,
  users: state.user.allUsers,
  leaveTypes: state.requests.leaveTypes,
  teams: state.teams
})

export default connect(
  mapStateToProps,
  {
    queryRequests: adminOperations.submitQueryRequests,
    getAllUsers: userOperations.getAllUsers
  }
)(ReportsPage)
