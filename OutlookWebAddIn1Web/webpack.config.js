const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for your React code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output bundled file
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  mode: 'development', // Change to 'production' for production builds
};