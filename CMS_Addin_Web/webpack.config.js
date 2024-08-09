const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

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
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          //{
          //  loader: "postcss-loader",
          //  options: {
          //    plugins: () => [
          //      require("autoprefixer")()
          //    ],
          //  },
          //},
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
  mode: 'development', // Change to 'production' for production builds
};