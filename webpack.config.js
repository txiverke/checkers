const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode = 'development' }) => {
  console.log(mode)
  return webpackMerge(
    {
      entry: ['./src/index.js'],
      mode,
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env'],
              },
            },
            exclude: '/node_modules/',
          },
          {
            test: /\.(jpg|jpeg|png|ico|gif|ttf)$/,
            use: [{ loader: 'url-loader', options: { limit: 5000 } }],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          favicon: './public/favicon.ico',
        }),
        new webpack.ProgressPlugin(),
      ],
      resolve: {
        extensions: ['.js'],
      },
    },
    modeConfig(mode),
  );
}
  
