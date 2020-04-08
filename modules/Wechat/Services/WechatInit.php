<?php

namespace Modules\Wechat\Services;

use App\Models\Account;
use EasyWeChat\Factory;

class WechatInit
{
    public static function officeAccount($aid = '')
    {
        $config = [
            'app_id' => option('SOCIAL_OAUTH_WECHAT_CLIENT_ID'),
            'secret' => option('SOCIAL_OAUTH_WECHAT_CLIENT_SECRET')
        ];
        return Factory::officialAccount($config);
    }

    /**
     * @param $aid
     * @return mixed
     */
    public static function miniProgram()
    {
        // $account = Account::where('aid', $aid)->first();
        // if(!$account){
        //     return response()->json(['errcode' => -1, 'Account Not Exist']);
        // }
        $config = [
            'app_id' => 'wx6336a994a22863da',
            'secret' => '16d5589d927db9915db272c535d68e5e',
        ];
        return Factory::miniProgram($config);
    }

    /**
     * @param string $aid
     * @return \EasyWeChat\Payment\Application
     */
    public static function payment($aid = '')
    {
        $config = [
            // 必要配置
            'app_id'             => 'wx6336a994a22863da',
            'mch_id'             => '1520011591',
            'key'                => 'csLHvAfxZ5cpPkEuNrE6yJuaF3Q8ZVpg'
        ];
        return Factory::payment($config);
    }
}
