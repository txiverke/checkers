module.exports = () => ({
  devtool: "eval-source-map",
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
})
