<?php

namespace Modules\Game\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class GameDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->gameComponent();
        // $this->call("OthersTableSeeder");
    }

    protected function gameComponent()
    {
        $components = [
            [
                'name' => 'truck/button',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/truck/button/0.1.6/index.js',
                'version' => '0.1.6',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'按钮'
            ],
            [
                'name' => 'truck/drumPad',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/truck/drumPad/1.0.1/index.js',
                'version' => '1.0.1',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'格子块，n行n列的块状区域，每个块有两个状态'
            ],
            [
                'name' => 'truck/ListContainer',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/truck/ListContainer/0.1.6/index.js',
                'version' => '0.1.6',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'列表容器'
            ],
            [
                'name' => 'truck/image',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/truck/image/0.1.7/index.js',
                'version' => '0.1.7',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'图片'
            ],
            [
                'name' => 'truck/text',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/truck/text/0.1.7/index.js',
                'version' => '0.1.7',
                'visibilitylevel' => 1,
                'status' => '1',
                'desc' =>'文本'
            ],
            [
                'name' => 'truck/video',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/video/0.1.7/index.js',
                'version' => '0.1.7',
                'desc' => '视频组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => 'Luffy/listNormal',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/Luffy/listNormal/1.0.2/index.js',
                'version' => '1.0.2',
                'desc' => '普通列表',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => 'truck/PageContainer',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/PageContainer/1.0.2/index.js',
                'version' => '1.0.2',
                'desc' => '页面容器组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => 'Luffy/buttonA',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/Luffy/buttonA/1.0.1/index.js',
                'version' => '1.0.1',
                'desc' => '普通按钮',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => 'truck/richtext',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/richtext/1.1.5/index.js',
                'verrsion' => '1.1.5',
                'desc' => '富文本',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => 'truck/emptyContainer',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/emptyContainer/1.0.2/index.js',
                'version' => '1.0.2',
                'desc' => '空容器节点',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => 'Luffy/rule',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/Luffy/rule/1.0.0/index.js',
                'version' => '0.1.7',
                'desc' => '规则',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => 'Luffy/input',
                'path' =>'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/Luffy/input/1.0.2/index.js',
                'version' => '0.1.7',
                'desc' => '输入框',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => 'truck/audio',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/truck/audio/0.1.3/index.js',
                'version' => '0.1.3',
                'desc' => '音频组件',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => '2c0b/echarts',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/2c0b/echarts/1.0.0/index.js',
                'version' => '1.0.0',
                'desc' => '数据图表',
                'visibilitylevel' => 1,
                'status' => '1',
            ],
            [
                'name' => '122410000/backtop',
                'path' => 'https://ymm-maliang.oss-cn-hangzhou.aliyuncs.com/ymm-maliang/122410000/backtop/1.0.0/index.js',
                'version' => '1.0.0',
                'desc' => '回到顶部',
                'visibilitylevel' => 1,
                'status' => '1',
            ]
        ];
        DB::table('game__diy_components')->insert($components);
    }
}
