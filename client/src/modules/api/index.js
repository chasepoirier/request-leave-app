import UserEndpoints from './User'
import SupervisorEndpoints from './Supervisor'
import TeamEndpoints from './Team'
import RequestEndpoints from './Requests'

const api = {
  user: UserEndpoints,
  supervisor: SupervisorEndpoints,
  team: TeamEndpoints,
  requests: RequestEndpoints
}

export default api
