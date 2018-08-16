import PropTypes from 'prop-types'

const { shape, string, bool } = PropTypes

export const UserInfoPTs = shape({
  id: string,
  uid: string,
  email: string,
  fname: string,
  lname: string,
  admin: bool,
  super: bool,
  token: string
})
