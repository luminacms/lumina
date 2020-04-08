<!DOCTYPE html><html><head><meta charset=utf-8><meta http-equiv=X-UA-Compatible content="IE=edge"><meta name=viewport content="width=device-width,initial-scale=1"><meta name=csrf-token content="{{ csrf_token() }}"><meta name=author content=jory|jorycn@163.com><title></title><script>@php
              $url = url('/');
              $parsedUrl = parse_url($url);

              $baseUrl = $url . '/';
              $baseProtocol = array_key_exists('scheme', $parsedUrl) ? $parsedUrl['scheme'] : 'http';
              $baseDomain = array_key_exists('host', $parsedUrl) ? $parsedUrl['host'] : '';
              $basePort = array_key_exists('port', $parsedUrl) ? $parsedUrl['port'] : 'false';
              $defaultParameters = method_exists(app('url'), 'getDefaultParameters') ? json_encode(app('url')->getDefaultParameters()) : '[]';
      @endphp
      window.Ziggy = {
        namedRoutes: {
          "p.vod.index":{"uri":"vod","methods":["GET","HEAD"],"domain":null},
          "p.vod.lesson.info":{"uri":"vod\/lessons","methods":["GET","HEAD"],"domain":null},
        },
        baseUrl: '{{ $baseUrl }}',
        baseProtocol: '{{ $baseProtocol}}',
        baseDomain: '{{ $baseDomain }}',
        basePort: false,
        defaultParameters: '{{ $defaultParameters}}'
      };</script><link href=/dist/vod/css/chunk-vendors.ce51da24.css rel=preload as=style><link href=/dist/vod/css/user/login1.1b2b936d.css rel=preload as=style><link href=/dist/vod/js/chunk-vendors.6f38ae62.js rel=preload as=script><link href=/dist/vod/js/user/login1.2246eef3.js rel=preload as=script><link href=/dist/vod/css/chunk-vendors.ce51da24.css rel=stylesheet><link href=/dist/vod/css/user/login1.1b2b936d.css rel=stylesheet></head><body><noscript><strong>We're sorry but frontend doesn't work properly without JavaScript enabled. Please enable it to continue.</strong></noscript><div id=app></div><script src=/dist/vod/js/chunk-vendors.6f38ae62.js></script><script src=/dist/vod/js/user/login1.2246eef3.js></script></body></html>