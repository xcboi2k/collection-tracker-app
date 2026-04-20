import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabNavigator from '../navigators/TabNavigator'
const Stack = createNativeStackNavigator()

import UserStore from '@/stores/UserStore'
import AuthNavigator from '../navigators/AuthNavigator'

const MainApp = () => {
    const isLoggedIn = UserStore((state) => state.isLoggedIn)
    // useGetCategories()
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                id=""
            >
                {isLoggedIn === true ? (
                    <Stack.Screen name="MainMenuTab" component={TabNavigator} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainApp
