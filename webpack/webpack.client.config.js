const webpack = require('webpack')
const path = require('path')
const dotenv = require('dotenv')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizer = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const srcPath = (...filePath) => path.resolve('src', ...filePath)
const mode = process.env.NODE_ENV
const dir = path.join(__dirname, '../vars')
const vars = dotenv.config({ path: `${dir}/${mode}.env` }).parsed

const config = {
  devtool: 'source-map',
  entry: './src/index.csr.jsx',
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: 'fe.index.js',
    sourceMapFilename: '[chunkhash].[name].map.js', 
    chunkFilename: '[chunkhash].[name].chunk.js',
    publicPath: '/dist/'
  },
  mode: mode,
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { 'runtime': 'automatic' }]
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-react-inline-elements'
            ],
          },
        }
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              import: true,
              importLoaders: 1,
              sourceMap: false,
              modules: {
                localIdentName: '[path]__[name]__[local]',
                localIdentContext: srcPath()
              }
            }
          },
          { /*
             * This custom loaders allows us to use the global env vars in our
             * scss
             */
            loader: path.resolve('./webpack/scss-var-loader.js'),
            options: {
              vars: vars
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sourceMap: false,
              sassOptions: {
                includePaths: [
                  srcPath('styles'),
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      layouts: path.resolve(__dirname, '../src/layouts' ),
      routes: path.resolve(__dirname, '../src/routes' ),
      slices: path.resolve(__dirname, '../src/slices'),
      styles: path.resolve(__dirname, '../src/styles'),
      //utils: path.resolve(__dirname, '../src/utils')
    },
    extensions: ['.*', '.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
      publicPath: '/dist'
    }),
    new ESLintPlugin({
      extensions:['js', 'jsx', 'json']
    }),
    new MiniCssExtractPlugin({
      filename: '[chunkhash].[name].css',
      chunkFilename: '[chunkhash].[name].css'
    })
  ],
  optimization: {
    /* Disabling the optimizer for this demo project, not needed.
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
          format: {
            comments: false,
          }
        },
        parallel: true,
        exclude: /^.*\.map\.js/,
        extractComments: false
      }),
      new CssMinimizer()
    ],
    */

    /*
     * TODO: J.Cater, we need to re-enable this,
     * We can set output.filename to '[chunkhash].index.js' but then
     * We won't have the proper reference set in src/index.ssr.jsx(template)

    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
    */
  }
}

module.exports = (env, argv) => {
  // Process and add the environment variables and make avail to the JS
  const envKeys = Object.keys(vars).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(vars[next])
    return prev
  }, {})

  // Setup the templates and make the environment variables globally avail
  config.plugins.push(new webpack.DefinePlugin(envKeys))

  return config
}
