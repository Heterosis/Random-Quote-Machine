/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'web',
  entry: ['@babel/polyfill', path.resolve('src', 'index.jsx')],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            },
          },
          { loader: 'css-loader' },
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|svg|jpe?g)$/,
        loader: 'file-loader',
        options: {
          name: '[folder]/[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      compoents: path.resolve('src', 'compoents'),
      css: path.resolve('src', 'css'),
    },
    extensions: ['.js', '.jsx', '.json', '.html'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].css?h=[fullhash]' }),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      favicon: path.resolve('src', 'assets', 'favicon.ico'),
    }),
  ],
  output: {
    filename: '[name].js?h=[fullhash]',
    path: path.resolve('dist'),
  },
};
