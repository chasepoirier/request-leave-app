import axios from 'axios'
import { apiBase } from 'config'

const RequestEndpoints = {
  createNewRequest: (user, request) =>
    axios({
      url: `${apiBase}/requests/add_new_request`,
      data: { user, request },
      method: 'post',
      baseURL: '/'
    }).then(res => {
      if (res.data.success) {
        return true
      }
      return new Error()
    }),
  fetchAllUserRequests: id =>
    axios({
      url: `${apiBase}/requests/fetch_all_requests`,
      data: { id },
      method: 'post',
      baseURL: '/'
    })
      .then(res => res.data.requests)
      .catch(err => err),
  deleteRequest: ({ userID, requestID, teamID, request }) =>
    axios({
      url: `${apiBase}/requests/delete_request`,
      data: {
        userID,
        requestID,
        teamID,
        request
      },
      baseURL: '/',
      method: 'post'
    }).then(res => {
      if (res.data.success) {
        return true
      }
      return new Error()
    }),
  fetchAllLeaveTypes: () =>
    axios({
      url: `${apiBase}/requests/get_all_leave_types`,
      baseURL: '/'
    }).then(res => {
      if (res.data.types) {
        return res.data.types
      }
      return new Error()
    })
}

export default RequestEndpoints
