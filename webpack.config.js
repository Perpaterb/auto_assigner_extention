const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    script: './src/components/script.js',
    contentScript: './src/components/contentScript.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
        
        { 
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader:'babel-loader',
            options: {
                presets:['@babel/preset-env','@babel/preset-react']
            }
        }},
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
     }],
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new MiniCssExtractPlugin(),
  new CopyPlugin({
    patterns: [
      { from: "public" },
    ],
  }),
],
};