import UserEndpoints from './User'
import SupervisorEndpoints from './Supervisor'
import TeamEndpoints from './Team'
import RequestEndpoints from './Requests'
import AdminEndpoints from './Admin'

const api = {
  user: UserEndpoints,
  supervisor: SupervisorEndpoints,
  team: TeamEndpoints,
  requests: RequestEndpoints,
  admin: AdminEndpoints
}

export default api
