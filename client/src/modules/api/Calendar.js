import axios from 'axios'
import { apiBase } from 'config'

const RequestEndpoints = {
  getAllApprovedRequests: () =>
    axios.get(`${apiBase}/calendar/get_all_approved_requests`).then(res => {
      if (res.data.requests) {
        return res.data.requests
      }
      return new Error()
    })
}

export default RequestEndpoints
