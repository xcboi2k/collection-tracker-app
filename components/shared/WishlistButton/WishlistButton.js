import { View, Text } from 'react-native'
import React from 'react'

import { Container, Title, Amount } from './styles'

const WishlistButton = ({ onPress, name, amount}) => {
    return (
        <Container onPress={onPress}>
            <Title>{name}</Title>
            <Amount>₱ {amount}</Amount>
        </Container>
    )
}

export default WishlistButton