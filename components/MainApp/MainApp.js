import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "../navigators/TabNavigator/TabNavigator";
import MainMenuScreen from '../screens/MainMenuScreen/MainMenuScreen'
const Stack = createNativeStackNavigator();

import useGetCategories from "../../hooks/useGetCategories";

const MainApp = () => {
    useGetCategories();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="MainMenuTab"
                    component={TabNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainApp