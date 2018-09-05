export const convertObjectToArray = obj => Object.keys(obj).map(key => obj[key])

export const equal = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = arr1.length; i--; ) {
    if (arr1[i].amount !== arr2[i].amount) return false
  }

  return true
}
