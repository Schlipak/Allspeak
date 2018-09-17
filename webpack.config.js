const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
console.log(
  `>>> Building in ${isProduction ? 'production' : 'development'} mode`
);

const plugins = [];
if (isProduction) {
  plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /logger/,
      `${process.cwd()}/src/utils/empty_logger.js`
    )
  );
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'allspeak.pkg.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components|\.spec\.js)/,
        use: isProduction ? [{ loader: 'webpack-strip-block' }] : [],
      },
    ],
  },
};
