import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { viewOperations } from 'modules/ducks/view'
import { StatusContainer, Text, CloseButton } from './Styled'

const StatusBar = ({ visible, content, hideStatusBar }) => (
  <StatusContainer visible={visible}>
    <Text>{content}</Text>
    <CloseButton onClick={hideStatusBar} className="fas fa-times-circle" />
  </StatusContainer>
)

StatusBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  hideStatusBar: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  visible: state.view.statusbar.visible,
  content: state.view.statusbar.content
})

export default connect(
  mapStateToProps,
  { hideStatusBar: viewOperations.hideStatusBar }
)(StatusBar)
