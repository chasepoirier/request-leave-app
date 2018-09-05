export const updateValueInArray = (values, array) => {
  const newArr = array

  values.forEach(value => {
    const index = array.map(i => i.id).indexOf(value.type)
    newArr.splice(index, 1, {
      ...array[index],
      amount: array[index].amount - value.amount
    })
  })

  return newArr
}
