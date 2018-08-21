import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { viewOperations } from '../../modules/ducks/view'
import { ButtonOutline, ButtonFilled } from '../Styled'
import {
  DangerContainer,
  PopupContainer,
  ContentContainer,
  CloseContainer,
  Header,
  SubHeader
} from './Styled'
import Colors from '../../design/Colors'

const DangerPopup = ({ handleSubmit, title, desc, closePopup }) => (
  <PopupContainer>
    <DangerContainer>
      <ContentContainer>
        <Header>{title}</Header>
        <SubHeader>{desc}</SubHeader>
        <ButtonOutline
          style={{
            borderColor: Colors.Red200,
            color: Colors.Red200,
            width: '100%',
            marginBottom: 8
          }}
          onClick={closePopup}
        >
          Cancel
        </ButtonOutline>
        <ButtonFilled
          style={{
            backgroundColor: Colors.Red200,
            borderColor: Colors.Red50,
            width: '100%'
          }}
          onClick={handleSubmit}
        >
          Delete User
        </ButtonFilled>
      </ContentContainer>
    </DangerContainer>
    <CloseContainer onClick={closePopup} />
  </PopupContainer>
)

const { func, string } = PropTypes

DangerPopup.defaultProps = {
  handleSubmit: null
}

DangerPopup.propTypes = {
  title: string.isRequired,
  desc: string.isRequired,
  closePopup: func.isRequired,
  handleSubmit: func
}

const mapStateToProps = state => ({
  handleSubmit: state.view.popup.content.handleSubmit,
  title: state.view.popup.content.title,
  desc: state.view.popup.content.desc
})

export default connect(
  mapStateToProps,
  { closePopup: viewOperations.hidePopup }
)(DangerPopup)
