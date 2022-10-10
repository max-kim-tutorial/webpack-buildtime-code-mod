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
          exclude: '/node_modules/',
          use: [
            {
              loader: path.resolve(__dirname, './plugins/customLoader.js'),
              options: {
                // named export였던 것을 default export로 바꾸거나 하는 처리..? 도 가능하긴 할듯
                named: {
                  add: { from: './module/a', to: './module/b' },
                  sub: { from: './module/a', to: './module/b' },
                },
                default: {},
              },
            },
            {
              loader: 'swc-loader',
              options: { jsc: { parser: { syntax: 'typescript' } } },
            },
          ],
        },
      ],
    },
    plugins: [],
    resolve: {
      // alias: {
      //   './module/a': './module/b',
      // },
      extensions: ['.ts', '.tsx', '.js', '.json'],
    },
  };

  return config;
};

module.exports = webpackConfig;
