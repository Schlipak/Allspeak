const path = require('path');

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
        use: [{ loader: 'webpack-strip-block' }],
      },
    ],
  },
};
