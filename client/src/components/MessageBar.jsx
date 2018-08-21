import React from 'react'
import PropTypes from 'prop-types'
import { SubLabel } from './Styled'
import Colors from '../design/Colors'

const MessageBar = ({ message, success }) => (
  <SubLabel
    color={success ? Colors.blue500 : Colors.Red200}
    style={{ margin: '20px 0 50px' }}
  >
    {message}
  </SubLabel>
)

const { bool, string } = PropTypes

MessageBar.propTypes = {
  message: string.isRequired,
  success: bool.isRequired
}

export default MessageBar
