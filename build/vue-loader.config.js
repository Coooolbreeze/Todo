module.exports = (isDev) => {
  let options = {
    preserveWhitepace: true,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }

  if (!isDev) {
    // const MiniCssExtractPlugin = require('mini-css-extract-plugin')

    options.loaders = {
      stylus: [
        // MiniCssExtractPlugin.loader,
        'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            module: true,
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    }
  }

  return options
}
