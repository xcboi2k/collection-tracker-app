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
            iconSize = 38;

        if (route.name === "Home") {
            return <HomeIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Collections") {
            return <CollectionIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Categories") {
            return <CategoriesIcon color={iconColor} size={iconSize} />;
        } else if (route.name === "Wishlists") {
            return <WishlistIcon color={iconColor} size={iconSize} />;
        }
    },
    tabBarInactiveTintColor: colors.primary.colorThree,
    tabBarActiveTintColor: colors.primary.colorTwo,
    tabBarStyle: {
        backgroundColor: colors.primary.colorOne,
        position: "relative",
        height: 90,
        alignContent: "center",
        justifyContent: "center",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
    },
    tabBarItemStyle: {
        paddingVertical: 20,
    },
    tabBarLabelStyle: {
        fontFamily: FONTS.LIGHT,
        fontSize: 12,
        marginTop: 18,
    },
    headerShown: false,
    tabBarOnPress: ({ navigation, defaultHandler }) => {
        const { name } = route;
        const shouldReplaceStack = name === 'Home' || name === 'Collections' || name === 'Categories' || name === 'Wishlists'; // Adjust conditions as needed
    
        if (shouldReplaceStack) {
          // Replace the stack with the desired screen
            navigation.replace(name);
        } else {
          defaultHandler(); // Let the default handling occur for other tabs
        }
    },
});

const TabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            ...TabBarProps(route),
        })}
    >
        <Tab.Screen name="Home" component={MainMenuNavigator} />
        <Tab.Screen name="Collections" component={CollectionNavigator} />
        <Tab.Screen name="Categories" component={CategoriesNavigator} />
        <Tab.Screen name="Wishlists" component={WishlistNavigator} />
    </Tab.Navigator>
    )
}

export default TabNavigator