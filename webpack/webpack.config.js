const paths = require('./path.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const javascript = {
        test: /\.(js|jsx)$/,
        use: {loader: 'babel-loader' },
        exclude: /(node_modules|bower_components)/
}


const css = {
  test: /\.(css)$/,
  use: [
    // MiniCssExtractPlugin.loader,
    'css-loader',
    'style-loader',
    'postcss-loader',
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: './public/dist',
      },
    },
  ],
  include: /\.module\.css$/
}

const sass = {
  test: /\.(scss|css)$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    { loader: 'sass-loader', options: { sourceMap: true } },
    {
      loader: 'postcss-loader',
      options: {
          plugins(){ return [autoprefixer];},
          sourceMap: true,
      }
    }

  ],

      exclude: /\/module\.css$/
}


const html = {
      test: /\.(html)$/,
      use: [
        {
            loader: 'html-loader',
            options: { minimize: true }
        }
      ]
}

const imageConfig = {
      test: /\.(png|svg|jpg|gif)$/,
      use: [
            'file-loader',
            {
              loader: 'image-webpack-loader'
            }
      ]
}


const fontConfig = {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            'file-loader',
            {
                  loader: 'image-webpack-loader'
            }
        ]
}

const config = {
      mode:'none',
      entry: [paths.src + '/javascript/index.js'],
      // devtool: false,
      target: 'web',
      output: {
            path: paths.build,
            filename: '[name].bundle.js',
            publicPath: '/',
      },
      module: {
                rules: [javascript, sass, css, html, imageConfig, fontConfig]
      },
      plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'style.css',
          chunkFilename: 'style.css'
        }),
        new CopyPlugin({
          patterns: [
            {
              from: paths.src,
              to: paths.build,
            },
          ],

        }),
        new HtmlWebpackPlugin({
          title: 'Nexter',
          favicon: paths.src + '/images/favicon.png',
          template: paths.src + '/index.html',
          filename: 'index.html',
        }),
      ]
};

process.noDeprecation = true;


module.exports = config;
