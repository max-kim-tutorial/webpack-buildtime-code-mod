/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');

const webpackConfig = ({ target, env }) => {
  const config = {
    mode: 'production',
    entry: {
      bundle: path.resolve(__dirname, 'src/index.ts'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/i,
          loader: 'swc-loader',
          exclude: '/node_modules/',
        },
      ],
    },
    plugins: [],
    resolve: {
      alias: {},
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
  };

  return config;
};

module.exports = webpackConfig;
