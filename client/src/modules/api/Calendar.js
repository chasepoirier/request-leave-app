import axios from 'axios'
import { apiBase } from 'config'

const RequestEndpoints = {
  getAllApprovedRequests: () =>
    axios.get(`${apiBase}/calendar/get_all_approved_requests`).then(res => {
      if (res.data.requests) {
        return res.data.requests
      }
      return new Error()
    }),
  getAllExcludedDates: () =>
    axios.get(`${apiBase}/calendar/get_excluded_dates`).then(res => {
      if (res.data.dates) {
        return res.data.dates
      }
      return new Error()
    }),
  addExcludedDate: date =>
    axios.post(`${apiBase}/calendar/add_excluded_date`, { date }).then(res => {
      if (res.data.success) return true
      return new Error()
    }),
  deleteExcludedDate: id =>
    axios.post(`${apiBase}/calendar/delete_excluded_date`, { id }).then(res => {
      if (res.data.success) return true
      return new Error()
    })
}

export default RequestEndpoints
