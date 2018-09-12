import express from 'express'
// import moment from 'moment'
import { db } from '../firebase'

const router = express.Router()

router.get('/get_all_approved_requests', (req, res) => {
  db.collection('users')
    .get()
    .then(users => {
      const promises = []
      users.forEach(snap => {
        promises.push(
          db
            .collection('users')
            .doc(snap.id)
            .collection('requests')
            .where('approval.admin.pending', '==', false)
            .where('approval.supervisor.pending', '==', false)
            .where('approval.admin.approved', '==', true)
            .where('approval.supervisor.approved', '==', true)
            .get()
            .then(requests => {
              const all = []
              requests.forEach(request =>
                all.push({
                  ...request.data(),
                  uId: snap.id,
                  teamId: snap.data().team,
                  name: snap.data().name,
                  email: snap.data().email
                })
              )
              return all
            })
        )
      })

      Promise.all(promises).then(requests => {
        const flattenDeep = reqs =>
          reqs.reduce(
            (acc, val) =>
              Array.isArray(val)
                ? acc.concat(flattenDeep(val))
                : acc.concat(val),
            []
          )
        flattenDeep(requests)

        const merged = [].concat(...requests)

        res.json({ requests: [].concat(merged) })
      })
    })
})

module.exports = router
