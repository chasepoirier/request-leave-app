export const validMultiDay = diff => {
  if (diff < 0) {
    return {
      message: 'Your end time must be after your start time and a future date.',
      success: false
    }
  }
  if (diff === 0) {
    return {
      message:
        'You must be out for at least 2 work days for a multi-day request.',
      success: false
    }
  }
  return {
    message: `You will be out for ${diff} work days which is ${diff *
      8} hours.`,
    success: true
  }
}

export const validFullDay = diff => {
  if (diff < 0) {
    return {
      message: `You must select a date that's at least 1 day in the future.`,
      success: false
    }
  }
  return {
    message: `You will be out for a full work day which is 8 hours.`,
    success: true
  }
}

export const validTotalAmount = amount => {
  if (amount < 0) {
    return {
      message: `You added too much time! ${amount} hours over.`,
      success: false
    }
  }
  if (amount > 0) {
    return {
      message: `Add more time to your requests. ${amount} hours left. `,
      success: false
    }
  }
  return {
    message: `You're all set!`,
    success: true
  }
}
