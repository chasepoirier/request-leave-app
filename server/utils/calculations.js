import moment from 'moment'

export const incrementUntilMax = (total, amountToAdd, max) => {
  let final = 0
  for (let index = 0; index < amountToAdd; index += 1) {
    if (total + final < max) {
      final += 1
    }
  }
  return final + total
}

export const calculateHowManyHoursToAdd = data => {
  const { startDate, additional, vpl } = data
  const sinceStart = Math.trunc(
    (moment().diff(moment(startDate), 'months') + additional) / 12
  )

  if (sinceStart < 5) {
    return vpl < 192 ? incrementUntilMax(vpl, 4, 192) : vpl
  }
  if (sinceStart >= 5 && sinceStart <= 9) {
    return vpl < 240 ? incrementUntilMax(vpl, 5, 240) : vpl
  }
  if (sinceStart >= 10 && sinceStart <= 14) {
    return vpl < 288 ? incrementUntilMax(vpl, 6, 288) : vpl
  }
  if (sinceStart >= 15 && sinceStart <= 19) {
    return vpl < 336 ? incrementUntilMax(vpl, 7, 336) : vpl
  }
  if (sinceStart >= 20 && sinceStart <= 24) {
    return vpl < 384 ? incrementUntilMax(vpl, 8, 384) : vpl
  }
  if (sinceStart >= 25) {
    return vpl < 432 ? incrementUntilMax(vpl, 9, 432) : vpl
  }
  return vpl
}

export const returnAnnualAmountByYearsOfService = user => {
  const { startDate, additionalService } = user
  const sinceStart = Math.trunc(
    moment().diff(moment(startDate), 'months') + additionalService
  )
  if (sinceStart < 120) {
    return 32
  }
  if (sinceStart >= 120) {
    return 40
  }
  return 0
}

export const returnSickAmountByYearsOfService = user => {
  const { startDate, additionalService } = user
  const sinceStart = Math.trunc(
    moment().diff(moment(startDate), 'months') + additionalService
  )
  if (sinceStart < 60) {
    return 64
  }
  if (sinceStart >= 60 && sinceStart <= 119) {
    return 72
  }
  if (sinceStart >= 120) {
    return 80
  }
  return 0
}

export const returnArrayWithNewValue = (id, newAmount, array) => {
  const index = array.map(a => a.id).indexOf(id)
  const newTotal = newAmount
  const newArray = [
    ...array.slice(0, index),
    {
      ...array[index],
      amount: newTotal
    },
    ...array.slice(index + 1)
  ]
  return newArray
}
