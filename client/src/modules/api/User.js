import axios from 'axios'
import { apiBase } from 'config'

const UserEndpoints = {
  getUserByEmail: email =>
    axios.post(`${apiBase}/user/get_user_by_email`, { email }).then(res => {
      if (res.data.user) {
        return res.data.user
      }
      throw new Error()
    }),
  getUserByUid: uid =>
    axios
      .post(`${apiBase}/user/get_user_by_uid`, { uid })
      .then(res => res.data.user)
      .catch(() => null),
  getUserById: id =>
    axios
      .post(`${apiBase}/user/get_user_by_id`, { id })
      .then(res => res.data.user)
      .catch(() => null),
  getUserLogs: id =>
    axios.post(`${apiBase}/user/get_user_logs`, { id }).then(res => {
      if (res.data.logs) {
        return res.data.logs
      }
      return new Error()
    })
}

export default UserEndpoints
