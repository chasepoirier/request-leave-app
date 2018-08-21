import * as types from './types'

export const requestAllTeams = () => ({
  type: types.REQUEST_ALL_TEAMS
})

export const fetchAllTeamsSuccess = teams => ({
  type: types.FETCH_ALL_TEAMS_SUCCESS,
  payload: {
    teams
  }
})

export const fetchAllTeamsFail = error => ({
  type: types.FETCH_ALL_TEAMS_FAIL,
  payload: {
    error
  }
})
