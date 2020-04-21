const mix = require('laravel-mix');
require('laravel-mix-merge-manifest');

mix.setPublicPath('../../public/dist/').mergeManifest();
mix.setResourceRoot('/dist/')



mix.js(__dirname + '/Resources/assets/js/head.js', 'game/')
    .js(__dirname + '/Resources/assets/js/foot.js', 'game/')

if (mix.inProduction()) {
    mix.version();
}
