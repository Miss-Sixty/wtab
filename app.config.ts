import dayjs from 'dayjs'
import pkg from './package.json'

const lastBuildTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
export default defineAppConfig({
  ui: {
    primary: 'purple',
    gray: 'slate',
  },
  appInfo: {
    version: pkg.version,
    lastBuildTime,
  },
})
