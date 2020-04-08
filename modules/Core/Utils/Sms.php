<?php

namespace Modules\Core\Utils;

use Overtrue\EasySms\EasySms;

class Sms
{
    public function send($mobile, $options)
    {
        $config = [
            // HTTP 请求的超时时间（秒）
            'timeout' => 5.0,

            // 默认发送配置
            'default' => [
                // 网关调用策略，默认：顺序调用
                'strategy' => \Overtrue\EasySms\Strategies\OrderStrategy::class,
                // 默认可用的发送网关
                'gateways' => [
                    'juhe'
                ],
            ],
            // 可用的网关配置
            'gateways' => [
                'errorlog' => [
                    'file' => storage_path('logs/sms.log'),
                ],
                'juhe' => [
                    'app_key' => '9ecfce5d920b53d30bc3bdb80af74974',
                ]
            ],
        ];
        $easySms = new EasySms($config);

        return $easySms->send($mobile, [
            'content'  => $options['content'] ?? '',
            'template' => $options['template'] ?? '',
            'data' => $options['data'],
        ]);
    }
}