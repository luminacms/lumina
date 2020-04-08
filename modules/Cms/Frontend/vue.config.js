/* eslint-disable */
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
    filename: process.env.NODE_ENV === 'production'?resolve('../Resources/views/pages/'+chunk+'.blade.php'):chunk+'.html',
    title: titles[chunk]['title'],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})

module.exports = {
  pages,
  chainWebpack: config => {
    config.plugins.delete('named-chunks')
    config.resolve.alias
        .set('@', resolve('src'))
        .set('$libs', resolve('../../Core/Resources/assets/libs'))
  },
  devServer: {
    proxy: {
      '/interface': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },

  // output built static files to Laravel's public dir.
  // note the "build" script in package.json needs to be modified as well.
  filenameHashing: true,
  outputDir: process.env.NODE_ENV === 'production'? resolve('../../../public/'):'dist',
  assetsDir: process.env.NODE_ENV === 'production'?'dist/cms':'',

  // modify the location of the generated HTML file.
  // make sure to do this only in production.
  indexPath: './Frontend/index.tt'
}
