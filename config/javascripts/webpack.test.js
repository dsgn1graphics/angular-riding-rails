var helpers = require('./helpers');

const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('app', 'assets', 'angular', 'src')
  },

  module: {
    preLoaders: [
      // {
      //   test: /\.ts$/,
      //   loader: 'tslint-loader',
      //   exclude: [helpers.root('node_modules')]
      // },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'angular2-template-loader',
        exclude: [/\.e2e\.ts$/]
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          sourceMap: false,
          inlineSourceMap: true,
          compileOptions: {
            removeComments: true
          }
        },
        exclude: [/\.e2e\.ts$/]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: [helpers.root('app', 'assets', 'angular', 'src', 'index.html')]
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'url?!img?-minimize'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('app', 'assets', 'angular', 'src', 'app', 'stylesheets'),
        loader: 'null'
      },
      {
        test: /\.css$/,
        include: helpers.root('app', 'assets', 'angular', 'src', 'app', 'stylesheets'),
        loader: 'raw'
      }
    ],
    postLoaders: [
      {
        test: /\.(js|ts)$/,
        include: helpers.root('app', 'assets', 'angular', 'src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ],
        loader: 'istanbul-instrumenter-loader',
      },
    ],
    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': false,
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': false
        }
      })
    ],
    node: {
      global: 'window',
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
}

