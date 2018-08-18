import * as actions from './actions'
import api from '../../api'

export const requestAllTeams = () => actions.requestAllTeams()

export const fetchAllTeams = () => dispatch => {
  dispatch(requestAllTeams())
  return api.team
    .getAllTeams()
    .then(teams => dispatch(actions.fetchAllTeamsSuccess(teams)))
    .catch(() => dispatch(actions.fetchAllTeamsFail('Error getting teams')))
}
