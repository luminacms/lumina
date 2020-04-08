const mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');

require('laravel-mix-merge-manifest');

mix.setPublicPath('public/').mergeManifest();
// mix.setResourceRoot('/dist/')

if(!mix.inProduction()) {
    mix.sourceMaps();
}
if (mix.inProduction()) {
    mix.version();
}


// Core
mix.sass('modules/Core/Resources/sass/app.scss', 'css/core.css').options({
    processCssUrls: false,
    postCss: [tailwindcss('tailwind.config.js')]
});
mix.js('modules/Core/Resources/js/calendar/main.js', 'js/calendar.js');
