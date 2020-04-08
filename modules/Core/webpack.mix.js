const mix = require('laravel-mix');
var tailwindcss = require('tailwindcss');

// Core
mix.js('modules/Core/Resources/assets/js/core.js', 'core/core.js')
    .sass('modules/Core/Resources/assets/sass/app.scss', 'core/core.css').options({
        processCssUrls: false,
        postCss: [tailwindcss('tailwind.config.js')]
    });
