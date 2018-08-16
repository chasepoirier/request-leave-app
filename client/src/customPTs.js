import PropTypes from 'prop-types'

const { shape, string, bool } = PropTypes

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
