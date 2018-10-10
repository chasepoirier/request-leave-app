import axios from 'axios'
import { apiBase } from 'config'

const TeamEndpoints = {
  getAllTeams: () =>
    axios({ url: `${apiBase}/team/get_all_teams`, baseURL: '/' }).then(res => {
      if (res.data.teams) {
        return res.data.teams
      }
      throw new Error()
    })
}

export default TeamEndpoints
