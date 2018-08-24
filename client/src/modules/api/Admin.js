import axios from 'axios'
import { apiBase } from 'config'

const AdminEndpoints = {
  getPendingApprovals: team =>
    axios.post(`${apiBase}/admin/get_pending_approvals`, { team }).then(res => {
      if (res.data.requests) {
        return res.data.requests
      }
      throw new Error()
    })
}

export default AdminEndpoints
