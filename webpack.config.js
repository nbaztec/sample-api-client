/**
 * Created by nisheeth on 19/7/16.
 */

module.exports = {
  entry: [
    './public/javascripts/app/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: './public/javascripts/bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    moduleDirectories: ['./node_modules', '.public/javascripts/app'],
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};