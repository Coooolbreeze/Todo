module.exports = (isDev) => {
  let options = {
    preserveWhitepace: true,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }

  if (!isDev) {
    const MiniCssExtractPlugin = require('mini-css-extract-plugin')

    options.loaders = {
      stylus: MiniCssExtractPlugin.loader + '!css-loader!postcss-loader!stylus-loader'
    }
  }

  return options
}
