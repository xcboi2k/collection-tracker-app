require('tsx/cjs') // Add this to import TypeScript files
module.exports = require('./metro.config.ts')

import { getDefaultConfig } from 'expo/metro-config'

const config = getDefaultConfig(__dirname)

module.exports = config
