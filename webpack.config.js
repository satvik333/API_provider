// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  // other webpack configuration...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_HANDLER_URL': JSON.stringify(process.env.API_HANDLER_URL),
    }),
  ],
};
