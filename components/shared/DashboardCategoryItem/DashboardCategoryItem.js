import { View, Text } from 'react-native'
import React from 'react'
import PropTypes from "prop-types";
import Icon from '../../common/Icon';

import { Category, CategoryName, CategoryTotal, TextHolder } from './styles';

const DashboardCategoryItem = ({
    iconName,
    categoryName,
    total,
    iconColor,
}) => {
    return (
        <Category>
            <Icon name={iconName} color={iconColor} />
            <TextHolder>
                <CategoryName>{categoryName}</CategoryName>
                <CategoryTotal>₱ {total}</CategoryTotal>
            </TextHolder>
        </Category>
    )
}

DashboardCategoryItem.propTypes = {
    categoryName: PropTypes.string,
    total: PropTypes.number,
    inputProps: PropTypes.object,
    iconColor: PropTypes.string,
    iconName: PropTypes.string,
};

export default DashboardCategoryItem