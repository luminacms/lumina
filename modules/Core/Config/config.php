<?php
return [
    'name' => 'Core',
    // https://cdn.jsdelivr.net/npm/lumina.js@2.0.0/dist
    'lumina_js_cdn' => app()->isLocal()?asset('lumina'):'https://cdn.jsdelivr.net/npm/lumina.js@2.1.1/dist',
    'origanization_permission' => 1, //开启组织系统(0关闭，1开启)
    'options' => [
        // ['name' => 'CORE_GLOBAL_TITLE', 'label' => '系统名称', 'default' => 'Lumina'],

        //社交登陆 ==========================
        ['group' => '头条开放平台', 'name' => 'SOCIAL_OAUTH_TOUTIAO_CLIENT_ID', 'label' => 'client_id', 'default' => ''],
        ['group' => '头条开放平台', 'name' => 'SOCIAL_OAUTH_TOUTIAO_CLIENT_SECRET', 'label' => 'client_secret', 'default' => ''],
        ['group' => '头条开放平台', 'name' => 'SOCIAL_OAUTH_TOUTIAO_REDIRECT', 'label' => 'redirect', 'default' => ''],

        //微信 ==========================
        ['group' => '微信开放平台', 'name' => 'SOCIAL_OAUTH_WECHAT_CLIENT_ID', 'label' => 'client_id', 'default' => ''],
        ['group' => '微信开放平台', 'name' => 'SOCIAL_OAUTH_WECHAT_CLIENT_SECRET', 'label' => 'client_secret', 'default' => ''],
        ['group' => '微信开放平台', 'name' => 'SOCIAL_OAUTH_WECHAT_REDIRECT', 'label' => 'redirect', 'default' => url('callback/oauth/wechat/:oid'), 'disabled' => true],

        //GITHUB ==========================
        ['group' => 'Github开放平台', 'name' => 'SOCIAL_OAUTH_GITHUB_CLIENT_ID', 'label' => 'client_id', 'default' => ''],
        ['group' => 'Github开放平台', 'name' => 'SOCIAL_OAUTH_GITHUB_CLIENT_SECRET', 'label' => 'client_secret', 'default' => ''],
        ['group' => 'Github开放平台', 'name' => 'SOCIAL_OAUTH_GITHUB_REDIRECT', 'label' => 'redirect', 'default' => ''],

    ],
    'SMS_EXPIRED' => 5, //短信验证码失效时间，5分钟
];
