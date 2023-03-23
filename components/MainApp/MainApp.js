import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainMenuScreen from '../screens/MainMenuScreen/MainMenuScreen'
const Stack = createNativeStackNavigator();

const MainApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="WelcomePage"
                    component={MainMenuScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainApp