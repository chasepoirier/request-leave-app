import axios from 'axios'
import { apiBase } from 'config'

const RequestEndpoints = {
  createNewRequest: (user, request) =>
    axios
      .post(`${apiBase}/requests/add_new_request`, { user, request })
      .then(res => {
        if (res.data.success) {
          return true
        }
        return new Error()
      }),
  fetchAllUserRequests: id =>
    axios
      .post(`${apiBase}/requests/fetch_all_requests`, { id })
      .then(res => res.data.requests)
      .catch(err => err)
}

export default RequestEndpoints
