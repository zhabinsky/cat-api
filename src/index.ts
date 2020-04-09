require('dotenv').config()

require('./app/server/utils/extendConsole') // pretty console output
require('./app/server')

console.notify('NODE_ENV=' + process.env.NODE_ENV)
