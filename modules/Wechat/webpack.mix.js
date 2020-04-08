const mix = require('laravel-mix');
require('laravel-mix-merge-manifest');

mix.setPublicPath('../../public/dist/').mergeManifest();
mix.setResourceRoot('/dist/')

// mix.js(__dirname + '/Resources/assets/js/app.js', 'js/wechat.js')
//     .sass( __dirname + '/Resources/assets/sass/app.scss', 'css/wechat.css');

mix.js(__dirname + '/Resources/js/wxjssdk.js', 'wechat/')

if (mix.inProduction()) {
    mix.version();
}
