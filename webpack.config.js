const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
console.log(`>>> Building in ${isProduction ? 'production' : 'development'} mode`);

const plugins = [];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'allspeak.pkg.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
