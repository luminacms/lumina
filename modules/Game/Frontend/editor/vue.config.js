const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const config = require('./src/config/index')
const resolve = function(dir) {
return path.join(__dirname, dir)
}

let page
switch (process.env.PAGE) {
  case 'CLIENT':
    page = {
      entry: 'src/client.js',
      template: 'src/client.tpl',
      outputDir: process.env.NODE_ENV === 'production' ? resolve('../../Resources/js') : `dist/${config.VIEW_NAME || 'view'}`,
      publicPath: process.env.NODE_ENV === 'production' ? 'assets/game' : '/',
      filename: process.env.NODE_ENV === 'production' ? resolve('../../Resources/views/game_diy.blade.php') : 'index.html',
      assetsDir: process.env.NODE_ENV === 'production' ? 'client' : 'static',
      port: 8566,
    }
    break
  case 'EDITOR':
  default:
    page = {
      entry: 'src/editor.js',
      template: 'src/editor.tpl',
      outputDir: process.env.NODE_ENV === 'production' ? resolve('../../Resources/js') : `dist/${config.EDITOR_NAME || 'editor'}`,
      publicPath: process.env.NODE_ENV === 'production' ? 'assets/game' : '/',
      filename: process.env.NODE_ENV === 'production' ? resolve('../../Resources/views/diyide.blade.php') : 'index.html',
      assetsDir: process.env.NODE_ENV === 'production' ? 'editor' : 'static',
      title: config.EDITOR_TITLE,
      port: 8565,
      externals: {
        'plupload': 'plupload',
      },
      alias: {
        'onigasm.wasm': path.join(__dirname, './node_modules/onigasm/lib/onigasm.wasm'),
      },
      plugins: [new MonacoWebpackPlugin()]
    }
}

const configureWebpack = {
  resolve: {
    alias: Object.assign({
      'src': path.join(__dirname, 'src')
    }, page.alias || {})
  },
  externals: Object.assign({
    'FastClick': 'FastClick',
    'html2canvas': 'html2canvas'
  }, page.externals || {}),
  plugins: page.plugins || []
}

if (process.env.NODE_ENV === 'production') {
  configureWebpack.externals.vue = 'Vue'
  configureWebpack.externals['vue-router'] = 'VueRouter'
  configureWebpack.externals.vuex = 'Vuex'
}

module.exports = {
  publicPath: page.publicPath,
  assetsDir: page.assetsDir,
  outputDir: page.outputDir,
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  pages: {
    index: {
      filename: page.filename,
      entry: page.entry,
      template: page.template,
      title: page.title,
      hmid: config.BAIDU_TONGJI
    }
  },
  devServer: {
    disableHostCheck: true,
    port: page.port,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
        '/interface': {
            target: 'http://127.0.0.1:8000',
            changeOrigin: true
        }
    }
  },
  configureWebpack: configureWebpack,
  chainWebpack: config => {
    config.plugins.delete('preload-index')
    config.plugins.delete('prefetch-index')

    config.plugin('define').tap(args => {
      args[0]['process.env'].CODE_ENV = JSON.stringify(process.env.CODE_ENV)
      return args
    })
    config.module
      .rule('wasm')
      .test(/\.wasm$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        return {
          limit: 0
        }
      })
  }
}
