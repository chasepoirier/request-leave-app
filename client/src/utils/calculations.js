export const dateDiff = (start, end, type) => {
  const startTime = start.diff(Date.now(), 'days')

  if (startTime < 1) {
    return -1
  }

  if (type === 'md') {
    const diff = end.diff(start, 'days')
    if (diff < 0 || diff === 0) {
      return diff
    }
    return end.businessDiff(start, 'days') + 1
  }
  return 1
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

export const requestTotalFromDateTotal = (requests, dateTotal) => {
  const hoursInDay = 8
  /* eslint no-param-reassign: off */
  const newTotal = requests.reduce((prev, curr) => {
    prev += parseInt(curr.amount, 10)
    return prev
  }, 0)

  return dateTotal * hoursInDay - newTotal
}

export const generateID = () =>
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  Math.random()
    .toString(36)
    .substr(2, 9)