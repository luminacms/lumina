'use strict'
const titles = require('./conf.js')
const glob = require('glob')
const path = require('path')
const pages = {}
const resolve = function(dir) {
  return path.join(__dirname, dir);
}

glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: path,
    template: process.env.NODE_ENV === 'production'?'public/index_build.html':'public/index.html',
    filename: process.env.NODE_ENV === 'production'?resolve('../resources/views/pages/'+chunk+'.blade.php'):chunk+'.html',
    title: titles[chunk]&&titles[chunk]['title'] || '',
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
module.exports = {
  pages,
  chainWebpack: config => {
    config.plugins.delete('named-chunks')
    config.resolve.alias
        .set('@', resolve('src'))
        .set('$libs', resolve('../modules/Core/Resources/assets/libs'))
  },

  devServer: {
    proxy: {
      '/vod': {
        target: 'http://192.168.10.1:8000',
        ws: true,
        changeOrigin: true
      },
      '/api': {
        target: 'http://192.168.10.1:8000',
        ws: true,
        changeOrigin: true
      },
      '/storage': {
        target: 'http://192.168.10.1:8000',
        ws: true,
        changeOrigin: true
      }
    }
  },

  filenameHashing: true,
  outputDir: process.env.NODE_ENV === 'production'? resolve('../../../public/'):'dist',
  assetsDir: process.env.NODE_ENV === 'production'?'dist/vod':'',

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: './Frontend/index.tt'


}
