import axios from 'axios'
import { apiBase } from 'config'

const SupervisorEndpoints = {
  addUserToDB: user =>
    axios.post(`${apiBase}/supervisor/add_user`, { user }).then(res => {
      if (res.data.user) {
        return res.data.user
      }
      throw new Error()
    }),
  deleteUserFromDB: id =>
    axios.post(`${apiBase}/supervisor/delete_user`, { id }).then(res => {
      if (res.data.success) {
        return true
      }
      throw new Error()
    })
}

export default SupervisorEndpoints
