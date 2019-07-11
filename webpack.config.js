
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    mode:'development',

    entry: {
      indes : './indes.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        // filename: 'indes.js',
        publicPath: '/dist/'
    },
    devServer: {
       // compress: true,
        port: 3000
  },
    module: {

      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            }
          ]
        }
      ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
          })
    ]

}