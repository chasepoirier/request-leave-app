import axios from 'axios'
import { apiBase } from 'config'

const UserEndpoints = {
  getUserByEmail: email =>
    axios({
      url: `${apiBase}/user/get_user_by_email`,
      data: { email },
      method: 'post',
      baseURL: '/'
    }).then(res => {
      if (res.data.user) {
        return res.data.user
      }
      throw new Error()
    }),
  getUserByUid: uid =>
    axios({
      url: `${apiBase}/user/get_user_by_uid`,
      data: { uid },
      method: 'post',
      baseURL: '/'
    })
      .then(res => res.data.user)
      .catch(() => null),
  getUserById: id =>
    axios({
      url: `${apiBase}/user/get_user_by_id`,
      data: { id },
      baseURL: '/',
      method: 'post'
    })
      .then(res => res.data.user)
      .catch(() => null),
  getUserLogs: id =>
    axios({
      url: `${apiBase}/user/get_user_logs`,
      data: { id },
      baseURL: '/',
      method: 'post'
    }).then(res => {
      if (res.data.logs) {
        return res.data.logs
      }
      return new Error()
    }),
  getAllUsers: () =>
    axios({ url: `${apiBase}/user/get_all_users`, baseURL: '/' }).then(res => {
      if (res.data.users) {
        return res.data.users
      }
      return new Error()
    })
}

export default UserEndpoints
