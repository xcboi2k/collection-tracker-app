import { View, Text } from 'react-native'
import React from 'react'
import { NumericFormat } from 'react-number-format';

import { Container, Title, Amount } from './styles'

const WishlistButton = ({ onPress, name, amount}) => {
    return (
        <Container onPress={onPress}>
            <Title>{name}</Title>
            <Amount>
                <NumericFormat
                    value={amount}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'₱ '}
                    decimalScale={2}
                    renderText={value => <Text>{value}</Text>}
                />
            </Amount>
        </Container>
    )
}

export default WishlistButton