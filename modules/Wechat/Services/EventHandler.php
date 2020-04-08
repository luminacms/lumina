<?php
/**
 * Created by PhpStorm.
 * User: jory
 * Date: 2018/11/7
 * Time: 13:54
 */

namespace Modules\Wechat\Services;


use EasyWeChat\Kernel\Contracts\EventHandlerInterface;
use EasyWeChat\Kernel\Messages\Text;
use Illuminate\Support\Facades\Log;

class EventHandler implements EventHandlerInterface
{

    /**
     * @param null $payload
     * @return Text
     */
    public function handle($payload = null)
    {
//        switch ($payload['Event']) {
//            case 'subscribe':
//                return $this->handleSubscribe();
//                break;
//        }
        Log::info($payload);
        //1 关注/取消关注事件

        //2 扫描带参数二维码事件

        //3 上报地理位置事件

        //4 自定义菜单事件

        //5 点击菜单拉取消息时的事件推送

        //6 点击菜单跳转链接时的事件推送
    }

    protected function handleSubscribe()
    {
        return new Text('欢迎您');
    }
}