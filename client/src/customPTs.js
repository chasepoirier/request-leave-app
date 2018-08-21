import PropTypes from 'prop-types'
// import { momentObj } from 'react-moment-proptypes'

const { shape, string, bool, arrayOf, number } = PropTypes

export const UserInfoPTs = shape({
  id: string,
  uid: string,
  email: string,
  name: shape({
    fname: string,
    lname: string
  }),
  status: shape({
    admin: bool,
    supervisor: bool
  }),
  token: string
})

export const TeamPT = shape({
  id: string,
  name: string,
  users: arrayOf(
    shape({
      name: shape({
        fname: string,
        lname: string
      })
    })
  )
})

export const RequestPT = shape({
  timestamp: string,
  types: arrayOf(
    shape({
      amount: number,
      id: string,
      type: string
    })
  ),
  approval: shape({
    admin: bool,
    supervisor: bool
  }),
  reason: string,
  totalTime: number,
  startDate: string,
  endDate: string
})
