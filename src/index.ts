require('dotenv').config();

require('./server/utils/extendConsole'); // pretty console output
require('./server');

console.notify('NODE_ENV=' + process.env.NODE_ENV);
