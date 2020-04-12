const env = require('dotenv').config().parsed || {};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    poweredByHeader: false,
    compress: false, // offload load from the Node.js process, let nginx do that
    env,
});
