import './global.css'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import * as Sentry from '@sentry/react-native'
import Toast from 'react-native-toast-message'

import colors from './assets/themes/colors'
import LoginScreen from './components/screens/auth/LoginScreen'
import MainMenuScreen from './components/screens/main/MainMenuScreen'
import MainApp from './components/MainApp'
import SignUpScreen from './components/screens/auth/SignUpScreen'

Sentry.init({
    dsn: 'https://6fc20bd1b053ec6ca53c66ff6c386cc2@o4511221589475328.ingest.us.sentry.io/4511255663083520',
    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,
})

function App() {
    return (
        <>
            <StatusBar backgroundColor={'#FFFFFF'} />
            <SignUpScreen />
            <Toast />
        </>
    )
}

export default Sentry.wrap(App)
