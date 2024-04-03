const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var AssetsPlugin = require('assets-webpack-plugin')
var assetsPluginInstance = new AssetsPlugin()
const isDev = process.env.NODE_ENV !== 'production';
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

//'polyfill':'babel-polyfill', //this is removed from entry
module.exports = {
  target: 'web',
  entry: isDev ?  [
    'babel-polyfill',
    './src/client.js'
  ]: { main:'./src/client.js'},
  output: {
    publicPath: '/',
    path: resolve(__dirname, '..', 'build'),
    filename: !isDev ? '[name].[chunkhash].js' : '[name].bundle.js',//'[name].[chunkhash].js',  //chunkhash
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: resolve(__dirname,'../src/images')
            } },
          'svg-transform-loader',
          'svgo-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {sourceMap: isDev}
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: isDev ? '[path]-[name]_[local]' : '[name]_[local]_[hash:5]', // [hash:base64]
                modules: true,
                sourceMap: isDev,
                minimize: !isDev
              }
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: isDev}
            }
          ]
        })
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: {
                "primary-color": "green",
                "link-color": "green",
                "font-family": "serif",
                hack: `true; @import "${resolve(
                  __dirname,
                  "./",
                  "theme.less"
                )}";`
              },
              javascriptEnabled: true
            }
          }
        ]
      },

      /*      {
              test: /\.s?css$/,
              use: ExtractTextPlugin.extract({
                fallback: {
                  loader: 'style-loader',
                  options: {sourceMap: isDev}
                },
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      localIdentName: isDev ? '[path]-[name]_[local]' : '[name]_[local]_[hash:5]', // [hash:base64]
                      modules: true,
                      sourceMap: isDev,
                      minimize: !isDev
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: isDev
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {sourceMap: isDev}
                  }
                ]
              })
            },
            {
              test: /\.less$/,
              use: ['style-loader', 'css-loader', 'less-loader']
            },*/
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },



      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ],
      }
    ]
  },
  plugins: [
    assetsPluginInstance,
    new CaseSensitivePathsPlugin(),

    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /en/
    ),

    //new BundleAnalyzerPlugin(),

    new ExtractTextPlugin({
      filename: '[name].css',
      /*
            disable: isDev
      */
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new SpriteLoaderPlugin(),
    /*
        new ExtractTextPlugin("styles.css"),
    */
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  resolve: {
    modules: [resolve(__dirname, '../src/'), 'node_modules'],
    alias: {moment: `moment/moment.js`},
    extensions: ['.js', '.jsx', '.scss', '.less']
  },
  optimization: isDev ? {splitChunks: {
      chunks: 'all'
    }} : {
    runtimeChunk: true,
    sideEffects: false,
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "reactvendor"
        },

        reactrouterVendor: {
          test: /[\\/]node_modules[\\/](react-router)[\\/]/,
          name: "reactroutervendor"
        },

        reacttransitionVendor: {
          test: /[\\/]node_modules[\\/](react-transition-group)[\\/]/,
          name: "reacttransitionvendor"
        },


        reactrouterdomVendor: {
          test: /[\\/]node_modules[\\/](react-router-dom)[\\/]/,
          name: "reactrouterdomvendor"
        },


        axiosVendor: {
          test: /[\\/]node_modules[\\/](axios)[\\/]/,
          name: "axiosvendor"
        },

        rcmodules: {
          test: /[\\/]node_modules[\\/](rc-picker|rc-trigger|rc-field-form|rc-tabs|rc-notification|rc-animate|rc-menu|rc-drawer|rc-tooltip)[\\/]/,
          name: "rcmodules"
        },

        jssVendor: {
          test: /[\\/]node_modules[\\/](jss)[\\/]/,
          name: "jssvendor"
        },


        moment: {
          test: /[\\/]node_modules[\\/](moment)[\\/]/,
          name: "moment"
        },


        recomposeVendor: {
          test: /[\\/]node_modules[\\/](recompose)[\\/]/,
          name: "recomposevendor"
        },

        mobxVendor: {
          test: /[\\/]node_modules[\\/](mobx|mobx-react)[\\/]/,
          name: "mobxVendor"
        },
        intlVendor: {
          test: /[\\/]node_modules[\\/](intl)[\\/]/,
          name: "intlVendor"
        },
        underscoreVendor: {
          test: /[\\/]node_modules[\\/](underscore)[\\/]/,
          name: "underscoreVendor"
        },
        polyfillVendor: {
          test: /[\\/]node_modules[\\/](babel-polyfill)[\\/]/,
          name: "polyfillVendor"
        },
        urlqueryVendor: {
          test: /[\\/]node_modules[\\/](query-string|append-query|url)[\\/]/,
          name: "queryurlVendor"
        },
      }
    }
  },
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: true,
    colors: true,
    entrypoints: false,
    modules: false
  }
};
//chunks: 'all'

/*

    runtimeChunk: 'single',
    namedModules: true,
    namedChunks: true,
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
*/

//            loader: 'file-loader?limit=5000&name=imgs/[name].[hash:6].[ext]'