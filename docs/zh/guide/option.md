# 配置文件

## 配置读取

使用方式  
```php
function option($key = null, $default = null)
```

**优先级**

优先数据库保存值 > 传参默认值 > 配置文件默认值

## 自研模块

自研模块在模块目录下的module.json中配置options字段即可。  
系统会自动识别，在模块启用的状态下，在后台配置文件处可进行在线配置

```php
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
```

**实际效果**

![](http://cdn.xbhub.com/luminaQQ%E6%B5%8F%E8%A7%88%E5%99%A8%E6%88%AA%E5%9B%BE20200602201836.png)
