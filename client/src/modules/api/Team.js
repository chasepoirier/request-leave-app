import axios from 'axios'
import { apiBase } from 'config'

const SupervisorEndpoints = {
  getAllTeams: () =>
    axios.get(`${apiBase}/team/get_all_teams`).then(res => {
      if (res.data.teams) {
        return res.data.teams
      }
      throw new Error()
    })
}

export default SupervisorEndpoints
