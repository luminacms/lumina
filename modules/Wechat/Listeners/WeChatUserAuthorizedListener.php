<?php

namespace Modules\Wechat\Listeners;

use App\Models\Wechat;
use Modules\Core\Models\User;
use Xbhub\Passport\Api\Kernel\Exceptions\Exception;

class WeChatUserAuthorizedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     * 该事件有以下属性
     *  $event->user; * 同 session('wechat.oauth_user.default') 一样
     *  $event->isNewSession; * 是不是新的会话（第一次创建 session 时为 true）
     *  $event->account; * 当前中间件所使用的账号，对应在配置文件中的配置项名称
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        try{
            if($event->isNewSession) {
                $user = new User();
                $user->loginWithSocial('wechat', $event->user['id'], $event->user['original']);

                session(['wechat.oauth_user.default' => $user]);
//                Log::info('i am login'.now());
            }

        }catch (Exception $e) {
            abort('500', 'WeChatUserAuthorizedListener: '.$e->getMessage());
        }
    }
}
