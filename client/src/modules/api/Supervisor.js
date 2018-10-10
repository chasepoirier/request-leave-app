import axios from 'axios'
import { apiBase } from 'config'

const SupervisorEndpoints = {
  addUserToDB: user =>
    axios({
      url: `${apiBase}/supervisor/add_user`,
      data: { user },
      method: 'post',
      baseURL: '/'
    }).then(res => {
      if (res.data.user) {
        return res.data.user
      }
      throw new Error()
    }),
  deleteUserFromDB: id =>
    axios({
      url: `${apiBase}/supervisor/delete_user`,
      data: { id },
      method: 'post',
      baseURL: '/'
    }).then(res => {
      if (res.data.success) {
        return true
      }
      throw new Error()
    }),
  getPendingApprovals: () =>
    axios({
      url: `${apiBase}/supervisor/get_pending_approvals`,
      baseURL: '/'
    }).then(res => {
      if (res.data.requests) {
        return res.data.requests
      }
      throw new Error()
    }),
  setApprovalStatus: (ids, approved) =>
    axios({
      url: `${apiBase}/supervisor/set_approval_status`,
      data: { ids, approved },
      method: 'post',
      baseURL: '/'
    }).then(res => {
      if (res.data.success) {
        return true
      }
      throw new Error()
    }),
  updateUserInfo: data =>
    axios({
      url: `${apiBase}/supervisor/update_user`,
      data: { ...data },
      method: 'post',
      baseURL: '/'
    }).then(res => {
      if (res.data.success) {
        return true
      }
      throw new Error()
    })
}

export default SupervisorEndpoints
