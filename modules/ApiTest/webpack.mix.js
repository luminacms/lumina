const mix = require('laravel-mix');
require('laravel-mix-merge-manifest');

mix.setPublicPath('../../public/dist/').mergeManifest();
mix.setResourceRoot('/dist/')

mix.js(__dirname + '/Resources/js/app.js', 'apitest/apitest.js')
    .sass( __dirname + '/Resources/sass/app.sass', 'apitest/apitest.css');

if (mix.inProduction()) {
    mix.version();
}
