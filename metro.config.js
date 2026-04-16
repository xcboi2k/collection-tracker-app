require('tsx/cjs') // Add this to import TypeScript files
module.exports = require('./metro.config.js')

import { getDefaultConfig } from 'expo/metro-config'
const { withNativeWind } = require('nativewind/metro')

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })
