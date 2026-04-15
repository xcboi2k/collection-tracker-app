import { View, Text } from 'react-native'
import React from 'react'

import { IconSelectorContainer, IconList, Title } from "./styles";

import colors from '../../../assets/themes/colors'

import ButtonIcon from '../ButtonIcon'

const IconOnlySelector = ({ iconData, selectedIcon, onPress }) => {
    const renderItem = ({ item: iconName, index }) => (
        <ButtonIcon
            name={iconName}
            iconColor={colors.primary.colorOne}
            key={index + iconName}
            type={iconName === selectedIcon ? "filled" : "outlined"}
            onPress={() => onPress(iconName)}
            styles={{ marginHorizontal: 10 }}
        />
    );

    return (
        <IconSelectorContainer>
            <Title>Icons:</Title>
            <IconList
                data={iconData}
                renderItem={renderItem}
                horizontal={true}
                extraData={{
                    icon: selectedIcon,
                }}
            />
        </IconSelectorContainer>
    )
}

export default IconOnlySelector