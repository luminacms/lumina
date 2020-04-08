<!DOCTYPE html><html><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1"><meta name=csrf-token content="{{ csrf_token() }}"><meta name=author content=jory|jorycn@163.com><title>公司新闻</title><script>@php
              $url = url('/');
              $parsedUrl = parse_url($url);

              $baseUrl = $url . '/';
              $baseProtocol = array_key_exists('scheme', $parsedUrl) ? $parsedUrl['scheme'] : 'http';
              $baseDomain = array_key_exists('host', $parsedUrl) ? $parsedUrl['host'] : '';
              $basePort = array_key_exists('port', $parsedUrl) ? $parsedUrl['port'] : 'false';
      @endphp
      window.Ziggy = {
        namedRoutes: {
          "p.index":{"uri":"cms\/p\/index","methods":["GET","HEAD"],"domain":null},
          "p.about":{"uri":"cms\/p\/about","methods":["GET","HEAD"],"domain":null},
        },
        baseUrl: '{{ $baseUrl }}',
        baseProtocol: '{{ $baseProtocol}}',
        baseDomain: '{{ $baseDomain }}',
        basePort: false
      };</script><link href=/dist/cms/css/about/company.40ee391b.css rel=preload as=style><link href=/dist/cms/css/chunk-vendors.84da697a.css rel=preload as=style><link href=/dist/cms/js/about/company.5ab0a867.js rel=preload as=script><link href=/dist/cms/js/chunk-vendors.2d180d03.js rel=preload as=script><link href=/dist/cms/css/chunk-vendors.84da697a.css rel=stylesheet><link href=/dist/cms/css/about/company.40ee391b.css rel=stylesheet></head><body><noscript><strong>We're sorry but frontend doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id=app></div><script src=/dist/cms/js/chunk-vendors.2d180d03.js></script><script src=/dist/cms/js/about/company.5ab0a867.js></script></body></html>