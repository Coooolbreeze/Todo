const ejs = require('ejs')

const getCookie = (ctx, name) => {
  if (!ctx.header.cookie) return ''
  let start = ctx.header.cookie.indexOf(name + '=')
  if (start === -1) return ''
  start = start + name.length + 1
  let end = ctx.header.cookie.indexOf(';', start)
  if (end === -1) end = ctx.header.cookie.length
  return ctx.header.cookie.substring(start, end)
}

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html'

  const context = {
    url: ctx.path,
    token: getCookie(ctx, 'access_token'),
    refresh_token: getCookie(ctx, 'refresh_token')
  }

  try {
    const app = await bundle(context)

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const appString = await renderer.renderToString(app, context)

    const {
      title
    } = context.meta.inject()

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initalState: context.renderState()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
