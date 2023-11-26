import React from 'react'
import { ActivityIndicator, Modal } from 'react-native'

import { LoaderContainer, ModalContainer, Overlay } from './styles'

import colors from '../../../assets/themes/colors'

const CustomLoader = ({visible}) => {
  return (
    <Modal>
        <ModalContainer transparent={true} visible={visible} animationType="fade">
            <Overlay>
                <LoaderContainer>
                    <ActivityIndicator size="large" color={colors.primary.colorOne}/>
                </LoaderContainer>
            </Overlay>
        </ModalContainer>
    </Modal>
  )
}

export default CustomLoader