import { View, Text } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeIcon from '../../../assets/icons/HomeIcon';
import CollectionIcon from '../../../assets/icons/CollectionIcon';
import CategoriesIcon from '../../../assets/icons/CategoriesIcon';
import WishlistIcon from '../../../assets/icons/WishListIcon'

import colors from '../../../assets/themes/colors';
import { FONTS } from '../../../constants/constant'

import MainMenuNavigator from '../../navigators/MainMenuNavigator';
import CollectionNavigator from '../../navigators/CollectionNavigator';
import CategoriesNavigator from '../../navigators/CategoriesNavigator';
import WishlistNavigator from '../../navigators/WishlistNavigator';

const Tab = createBottomTabNavigator();

const TabBarProps = (route) => ({
    tabBarIcon: ({ focused, color, size }) => {
        const iconColor = color,
            iconSize = 40;

        if (route.name === "Home") {
            return <HomeIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Collection") {
            return <CollectionIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Categories") {
            return <CategoriesIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Wishlist") {
            return <WishlistIcon color={iconColor} size={iconSize} />;
        }
    },
    tabBarInactiveTintColor: colors.primary.colorThree,
    tabBarActiveTintColor: colors.primary.colorTwo,
    tabBarStyle: {
        backgroundColor: colors.primary.colorOne,
        position: "relative",
        height: 120,
        alignContent: "center",
        justifyContent: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
    },
    tabBarItemStyle: {
        paddingVertical: 25,
    },
    tabBarLabelStyle: {
        fontFamily: FONTS.LIGHT,
        fontSize: 12,
        paddingTop: 10,
    },
    headerShown: false,
});

const TabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            ...TabBarProps(route),
        })}
    >
        <Tab.Screen name="Home" component={MainMenuNavigator} />
        <Tab.Screen name="Collection" component={CollectionNavigator} />
        <Tab.Screen name="Categories" component={CategoriesNavigator} />
        <Tab.Screen name="Wishlist" component={WishlistNavigator} />
    </Tab.Navigator>
    )
}

export default TabNavigator