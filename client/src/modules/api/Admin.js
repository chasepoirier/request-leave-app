import axios from 'axios'
import { apiBase } from 'config'

const AdminEndpoints = {
  getPendingApprovals: team =>
    axios.post(`${apiBase}/admin/get_pending_approvals`, { team }).then(res => {
      if (res.data.requests) {
        return res.data.requests
      }
      throw new Error()
    }),
  setApprovalStatus: (ids, approved) =>
    axios
      .post(`${apiBase}/admin/set_approval_status`, { ids, approved })
      .then(res => {
        if (res.data.success) {
          return true
        }
        throw new Error()
      })
}

export default AdminEndpoints
