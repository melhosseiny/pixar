const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, 'dist'),
      }],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
});
