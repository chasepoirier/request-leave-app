import cron from 'node-cron'
import {
  calculateHowManyHoursToAdd,
  returnAnnualAmountByYearsOfService,
  returnArrayWithNewValue,
  returnSickAmountByYearsOfService
} from '../utils/calculations'
import { db } from '../firebase'

export const annualTasks = cron.schedule('0 0 10 1 *', () => {
  db.collection('users')
    .get()
    .then(snaps => {
      snaps.forEach(snap => {
        const amounts = snap.data().typeAmounts
        const updateBirthday = returnArrayWithNewValue('bdl', 8, amounts)

        const annualAmount = returnAnnualAmountByYearsOfService(snap.data())
        const updateAnnual = returnArrayWithNewValue(
          'al',
          annualAmount,
          updateBirthday
        )

        const vSickAmount = returnSickAmountByYearsOfService(snap.data())
        const updateVSick = returnArrayWithNewValue(
          'vsl',
          vSickAmount,
          updateAnnual
        )
        const updateSerice = returnArrayWithNewValue('srvl', 16, updateVSick)

        db.collection('users')
          .doc(snap.id)
          .update({ typeAmounts: updateSerice })
      })
    })
})

export const biWeeklyTasks = cron.schedule('0 0 16,28 * *', () => {
  db.collection('users')
    .get()
    .then(snaps => {
      snaps.forEach(snap => {
        const amounts = snap.data().typeAmounts
        const index = amounts.map(a => a.id).indexOf('vpl')
        const data = {
          startDate: snap.data().startDate,
          additional: snap.data().additionalService,
          vpl: amounts[index].amount
        }

        const newVPLTotal = calculateHowManyHoursToAdd(data)

        const newAmounts = [
          ...amounts.slice(0, index),
          { ...amounts[index], amount: newVPLTotal },
          ...amounts.slice(index + 1)
        ]

        db.collection('users')
          .doc(snap.id)
          .update({ typeAmounts: newAmounts })
      })
    })
})
