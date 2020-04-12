const env = require('dotenv').config().parsed;

module.exports = {
    poweredByHeader: false,
    compress: false, // offload load from the Node.js process, let nginx do that
    env,
};
