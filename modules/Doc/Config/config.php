<?php

return [
    'name' => 'Doc',
    'ENABLED_HISTORY' => true,
    'SITE_NAME' => '文档共享',
    'MAIL_TOKEN_TIME' => 3600,
    'ENABLE_ANONYMOUS' => true,
    'ENABLED_CAPTCHA' => false,
    'ENABLED_REGISTER' => false,
    'DEFAULT_GROUP_LEVEL' => 1, //0 超级管理员/1 普通用户/ 2 访客
    'options' => [
        ['name' => 'DOC_CACHE_EXPIRED', 'label' => '缓存周期', 'default' => '10'],
        ['name' => 'DOC_CACHE_EXPIRED_2', 'label' => '缓存周期2', 'default' => '10'],
    ],
];
