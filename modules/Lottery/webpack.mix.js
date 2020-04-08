const mix = require('laravel-mix');
require('laravel-mix-merge-manifest');

mix.setPublicPath('../../public/dist/').mergeManifest();
mix.setResourceRoot('/dist/')

mix.js(__dirname + '/Resources/assets/js/app.js', 'lottery/app.js')
    .sass( __dirname + '/Resources/assets/sass/app.scss', 'lottery/app.css');

if (mix.inProduction()) {
    mix.version();
}
