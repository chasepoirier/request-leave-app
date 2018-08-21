import * as actions from './actions'
import * as utils from './utils'
import api from '../../api'

export const requestAddUser = () => actions.requestAddUser()

export const requestDeleteUser = () => actions.requestDeleteUser()

export const submitAddUser = user => dispatch => {
  dispatch(requestAddUser())
  return api.supervisor
    .addUserToDB(user)
    .then(newUser => dispatch(actions.addUserSuccess(newUser)))
    .catch(() => dispatch(actions.addUserFail(utils.errors.userExists)))
}

export const submitDeleteUser = id => dispatch => {
  dispatch(requestDeleteUser())
  return api.supervisor
    .deleteUserFromDB(id)
    .then(res => {
      dispatch(actions.deleteUserSuccess())
      return res
    })
    .catch(() => dispatch(actions.deleteUserFail('error deleting user')))
}
