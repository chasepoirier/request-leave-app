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
      .catch(err => err),
  deleteRequest: ({ userID, requestID, teamID }) =>
    axios
      .post(`${apiBase}/requests/delete_request`, { userID, requestID, teamID })
      .then(res => {
        if (res.data.success) {
          return true
        }
        return new Error()
      })
}

export default RequestEndpoints
