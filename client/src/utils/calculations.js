import moment from 'moment'

export const dateDiff = (start, end, type, excludedDates) => {
  // const startTime = start.diff(Date.now(), 'days')

  // if (startTime < 1) {
  //   return -1
  // }

  if (type === 'md') {
    const diff = end.diff(start, 'days')
    if (diff < 0 || diff === 0) {
      return diff
    }
    return addValidDates(start, end, excludedDates)
  }
  return 1
}

export const timeDiff = (start, end) => {
  const diff = end.diff(start, 'minutes')
  const convertToHours = diff / 60
  const rounded = (Math.round(convertToHours * 2) / 2).toFixed(1)
  return parseFloat(rounded)
}

const addValidDates = (start, end, excludedDates) => {
  const diff = end.diff(start, 'days') + 1
  let finalCount = 0
  for (let i = 0; i < diff + 1; i += 1) {
    const date = moment(start).add(i, 'days')
    if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
      const moments = excludedDates.map(d => moment(d.date))
      const valid = moments.reduce((prev, curr) => {
        if (date.isSame(curr, 'day')) {
          prev = false
        }
        return prev
      }, true)
      if (valid) {
        finalCount += 1
      }
    }
  }
  return finalCount
}

export const isWeekday = date => {
  const day = date.day()
  return day !== 0 && day !== 6
}

export const convertTotalTimeToHalfHours = total => {
  const result = []
  const hoursInDay = 8

  for (let i = 1; i <= total * hoursInDay * 2; i += 1) {
    result.push(i * 0.5)
  }

  return result
}

export const requestTotalFromDateTotal = (requests, dateTotal, type) => {
  const hoursInDay = 8
  /* eslint no-param-reassign: off */
  const newTotal = requests.reduce((prev, curr) => {
    prev += parseFloat(curr.amount, 10)
    return prev
  }, 0)

  const final =
    type === 'p' ? dateTotal - newTotal : dateTotal * hoursInDay - newTotal
  return final
}

export const generateID = () =>
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  Math.random()
    .toString(36)
    .substr(2, 9)
