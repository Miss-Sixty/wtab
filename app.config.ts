import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

// import timezone from 'dayjs/plugin/timezone'
import pkg from './package.json'

dayjs.extend(utc)
// dayjs.extend(timezone)
const lastBuildTime = ''
// dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
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
