import React from 'react'
import { Modal } from 'react-native'
import { AlertContainer, AlertMessage, AlertTitle, ButtonText, CloseButton, Overlay } from './styles'

const CustomAlert = ({ visible, title, message, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
        <Overlay>
            <AlertContainer>
                <AlertTitle>{title}</AlertTitle>
                <AlertMessage>{message}</AlertMessage>
                <CloseButton onPress={onClose}>
                    <ButtonText>OK</ButtonText>
                </CloseButton>
            </AlertContainer>
        </Overlay>
    </Modal>
  )
}

export default CustomAlert