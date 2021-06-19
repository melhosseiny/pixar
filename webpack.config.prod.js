const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 1,
              url: false
            }
          },
          { loader: 'postcss-loader', options: { postcssOptions: { config: path.join(__dirname, 'postcss.config.js') } } }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
});
