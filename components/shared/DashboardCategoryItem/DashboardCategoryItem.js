import { View, Text } from 'react-native'
import React from 'react'
import PropTypes from "prop-types";
import { NumericFormat } from 'react-number-format';

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
            <Icon name={iconName} color={iconColor} size={38}/>
            <TextHolder>
                <CategoryName>{categoryName}</CategoryName>
                <CategoryTotal>
                    <NumericFormat
                        value={total}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'₱'}
                        decimalScale={2}
                        renderText={value => <Text>{value}</Text>}
                    />
                </CategoryTotal>
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