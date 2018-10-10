import axios from 'axios'
import { apiBase } from 'config'

const AdminEndpoints = {
  getPendingApprovals: team =>
    axios({
      url: `${apiBase}/admin/get_pending_approvals`,
      baseURL: '/',
      data: { team },
      method: 'post'
    }).then(res => {
      if (res.data.requests) {
        return res.data.requests
      }
      throw new Error()
    }),
  setApprovalStatus: (ids, approved) =>
    axios({
      url: `${apiBase}/admin/set_approval_status`,
      data: { ids, approved },
      baseURL: '/',
      method: 'post'
    }).then(res => {
      if (res.data.success) {
        return true
      }
      throw new Error()
    }),
  getRequestsByQuery: data =>
    axios({
      url: `${apiBase}/admin/get_requests`,
      data: { data },
      baseURL: '/',
      method: 'post'
    }).then(res => {
      if (res.data.requests) {
        return res.data.requests
      }
      throw new Error()
    })
}

export default AdminEndpoints
