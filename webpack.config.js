const webpack = require('webpack')
const path = require('path')

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
}

var reduxExternal = {
  root: 'Redux',
  commonjs2: 'redux',
  commonjs: 'redux',
  amd: 'redux'
}

var reactReduxExternal = {
  root: 'ReactRedux',
  commonjs2: 'react-redux',
  commonjs: 'react-redux',
  amd: 'react-redux'
}

var reactDomExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
}

const webpackConfig = {

  externals: {
    'react': reactExternal,
    'redux': reduxExternal,
    'react-redux': reactReduxExternal,
    'react-dom': reactDomExternal
  },
  entry: {
    main: './src/index.js'
    // example: './example/src/main.js'
  },

  output: {
    filename: './dist/configurable-form.js',
    library: 'react-form',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json' },
    ]
  }
}

module.exports = webpackConfig
