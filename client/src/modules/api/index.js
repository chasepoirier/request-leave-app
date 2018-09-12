import UserEndpoints from './User'
import SupervisorEndpoints from './Supervisor'
import TeamEndpoints from './Team'
import RequestEndpoints from './Requests'
import AdminEndpoints from './Admin'
import CalendarEndpoints from './Calendar'

const api = {
  user: UserEndpoints,
  supervisor: SupervisorEndpoints,
  team: TeamEndpoints,
  requests: RequestEndpoints,
  admin: AdminEndpoints,
  calendar: CalendarEndpoints
}

export default api
