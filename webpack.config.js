const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

console.log(`>>> Building in ${devMode ? 'development' : 'production'} mode`);

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'allspeak.pkg.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components|\.spec\.js)/,
        use: devMode ? [] : [{ loader: 'webpack-strip-block' }],
      },
    ],
  },
};
