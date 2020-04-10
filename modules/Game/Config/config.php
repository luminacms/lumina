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
                'name' => 'pageContainer',
                'path' => url('assets/game/plugins/pageContainer/1.0.2/index.js'),
                'version' => '1.0.2',
                'desc' => '页面容器组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 2,
                'name' => 'emptyContainer',
                'path' => asset('assets/game/plugins/emptyContainer/1.0.2/index.js'),
                'version' => '1.0.2',
                'desc' => '空容器节点',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 3,
                'name' => 'button',
                'path' => asset('assets/game/plugins/button/0.1.6/index.js'),
                'version' => '0.1.6',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'按钮'
            ],
            [
                'id' => 4,
                'name' => 'truck/drumPad',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/truck/drumPad/1.0.1/index.js',
                'version' => '1.0.1',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'格子块，n行n列的块状区域，每个块有两个状态'
            ],
            [
                'id' => 5,
                'name' => 'truck/ListContainer',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/truck/ListContainer/0.1.6/index.js',
                'version' => '0.1.6',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'列表容器'
            ],
            [
                'id' => 6,
                'name' => 'image',
                'path' => asset('assets/game/plugins/image/0.1.7/index.js'),
                'version' => '0.1.7',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'图片'
            ],
            [
                'id' => 7,
                'name' => 'text',
                'path' => asset('assets/game/plugins/text/0.1.7/index.js'),
                'version' => '0.1.7',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'文本'
            ],
            [
                'id' => 8,
                'name' => 'video',
                'path' => asset('assets/game/plugins/video/0.1.7/index.js'),
                'version' => '0.1.7',
                'desc' => '视频组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 9,
                'name' => 'Luffy/listNormal',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/Luffy/listNormal/1.0.2/index.js',
                'version' => '1.0.2',
                'desc' => '普通列表',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 10,
                'name' => 'Luffy/buttonA',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/Luffy/buttonA/1.0.1/index.js',
                'version' => '1.0.1',
                'desc' => '普通按钮',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 11,
                'name' => 'richtext',
                'path' => asset('assets/game/plugins/richtext/1.1.5/index.js'),
                'verrsion' => '1.1.5',
                'desc' => '富文本',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 12,
                'name' => 'Luffy/rule',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/Luffy/rule/1.0.0/index.js',
                'version' => '0.1.7',
                'desc' => '规则',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 13,
                'name' => 'Luffy/input',
                'path' =>'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/Luffy/input/1.0.2/index.js',
                'version' => '0.1.7',
                'desc' => '输入框',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 14,
                'name' => 'audio',
                'path' => asset('assets/game/plugins/audio/0.1.3/index.js'),
                'version' => '0.1.3',
                'desc' => '音频组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 15,
                'name' => 'echarts',
                'path' => asset('assets/game/plugins/echarts/1.0.0/index.js'),
                'version' => '1.0.0',
                'desc' => '数据图表',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 16,
                'name' => 'backtop',
                'path' => asset('assets/game/plugins/backtop/1.0.0/index.js'),
                'version' => '1.0.0',
                'desc' => '回到顶部',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'id' => 17,
                'name' => 'vote',
                'path' => asset('assets/game/plugins/vote/0.0.1/index.js'),
                'version' => '0.0.1',
                'desc' => '表单组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ]
        ]
    ]
];
