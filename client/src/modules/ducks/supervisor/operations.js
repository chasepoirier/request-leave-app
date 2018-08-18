import * as actions from './actions'
import * as utils from './utils'
import api from '../../api'

export const requestAddUser = () => actions.requestAddUser()

export const submitAddUser = user => dispatch => {
  dispatch(requestAddUser())
  return api.supervisor
    .addUserToDB(user)
    .then(newUser => dispatch(actions.addUserSuccess(newUser)))
    .catch(() => dispatch(actions.addUserFail(utils.errors.userExists)))
}
