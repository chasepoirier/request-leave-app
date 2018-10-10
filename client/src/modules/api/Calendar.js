import axios from 'axios'
import { apiBase } from 'config'

const RequestEndpoints = {
  getAllApprovedRequests: () =>
    axios({
      url: `${apiBase}/calendar/get_all_approved_requests`,
      baseURL: '/'
    }).then(res => {
      if (res.data.requests) {
        return res.data.requests
      }
      return new Error()
    }),
  getAllExcludedDates: () =>
    axios({ url: `${apiBase}/calendar/get_excluded_dates`, baseURL: '/' }).then(
      res => {
        if (res.data.dates) {
          return res.data.dates
        }
        return new Error()
      }
    ),
  addExcludedDate: date =>
    axios({
      url: `${apiBase}/calendar/add_excluded_date`,
      data: { date },
      baseURL: '/',
      method: 'post'
    }).then(res => {
      if (res.data.success) return true
      return new Error()
    }),
  deleteExcludedDate: id =>
    axios({
      url: `${apiBase}/calendar/delete_excluded_date`,
      data: { id },
      baseURL: '/',
      method: 'post'
    }).then(res => {
      if (res.data.success) return true
      return new Error()
    })
}

export default RequestEndpoints
