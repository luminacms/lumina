使用方式
function option($key = null, $default = null)
优先级
1 优先数据库保存值；
2 config配置默认值；
3 传参默认值
配置事例
// 配置文件支持group分组
<?php
return [
    ...
    'options' => [
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
    ...
];
后台展示效果
