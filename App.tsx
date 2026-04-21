import './global.css'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import * as Sentry from '@sentry/react-native'

import colors from './assets/themes/colors'
import LoginScreen from './components/screens/auth/LoginScreen'
import MainMenuScreen from './components/screens/main/MainMenuScreen'
import MainApp from './components/MainApp'
import SignUpScreen from './components/screens/auth/SignUpScreen'

function App() {
    return (
        <>
            <StatusBar backgroundColor={'#FFFFFF'} />
            <SignUpScreen />
        </>
    )
}

export default Sentry.wrap(App)
