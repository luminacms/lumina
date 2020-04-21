<?php

return [
    'name' => 'Game',
    'mta' => [
        'app_id' => '',
        'secret_key' => ''
    ],
    'diy' => [
        'components' => [
            [
                'id' => 1,
                'name' => 'truck/PageContainer',
                'path' => asset('assets/game/truck/PageContainer/1.0.2/index.js'),
                'version' => '1.0.2',
                'desc' => '页面容器组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 2,
                'name' => 'truck/emptyContainer',
                'path' => asset('assets/game/truck/emptyContainer/1.0.2/index.js'),
                'version' => '1.0.2',
                'desc' => '空容器节点',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 3,
                'name' => 'truck/button',
                'path' => asset('assets/game/truck/button/0.1.6/index.js'),
                'version' => '0.1.6',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'按钮'
            ],
            [
                'id' => 6,
                'name' => 'truck/image',
                'path' => asset('assets/game/truck/image/0.1.7/index.js'),
                'version' => '0.1.7',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'图片'
            ],
            [
                'id' => 7,
                'name' => 'truck/text',
                'path' => asset('assets/game/truck/text/0.1.7/index.js'),
                'version' => '0.1.7',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'文本'
            ],
            [
                'id' => 8,
                'name' => 'truck/video',
                'path' => asset('assets/game/truck/video/0.1.7/index.js'),
                'version' => '0.1.7',
                'desc' => '视频组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 11,
                'name' => 'truck/richtext',
                'path' => asset('assets/game/truck/richtext/1.1.5/index.js'),
                'verrsion' => '1.1.5',
                'desc' => '富文本',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 14,
                'name' => 'truck/audio',
                'path' => asset('assets/game/truck/audio/0.1.3/index.js'),
                'version' => '0.1.3',
                'desc' => '音频组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 17,
                'name' => 'truck/vote',
                'path' => asset('assets/game/truck/vote/0.0.1/index.js'),
                'version' => '0.0.1',
                'desc' => '表单组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ]
        ]
    ]
];
