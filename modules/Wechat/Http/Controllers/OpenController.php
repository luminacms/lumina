<?php
/**
 * Created by PhpStorm.
 * User: jory
 * Date: 2018/11/8
 * Time: 14:24
 */

namespace Modules\Wechat\Http\Controllers;

use App\Models\Account;
use App\Services\WechatService;
use EasyWeChat\Kernel\Messages\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Models\User;
use Modules\Core\Models\UserSocialite;
use Modules\Wechat\Services\EventHandler;
use Modules\Wechat\Services\MessageHandler;
use Modules\Wechat\Services\WechatInit;
use Tymon\JWTAuth\Facades\JWTAuth;

class OpenController extends BaseController
{

    /**
     * @param WechatInit $wechatInit
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws \EasyWeChat\Kernel\Exceptions\BadRequestException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     * @throws \ReflectionException
     */
    public function index(WechatInit $wechatInit, Request $request)
    {
        $request->validate(['aid' => 'required']);
        $wechat = $wechatInit->officeAccount($request->get('aid'));

        // 事件监听
        $wechat->server->push(EventHandler::class, Message::DEVICE_EVENT | Message::DEVICE_TEXT  | Message::TRANSFER | Message::EVENT | Message::MINIPROGRAM_PAGE);
        // 消息监听
        $wechat->server->push(MessageHandler::class, Message::TEXT | Message::IMAGE | Message::VOICE | Message::VIDEO | Message::SHORT_VIDEO | Message::LOCATION | Message::LINK | Message::FILE | Message::TEXT_CARD);
        // 服务监听
//        $wechat->server->push(new ServiceHandler($aid), Message::ALL);

        return $wechat->server->serve();
    }

    /**
     * jssdk sign
     */
    public function getsign()
    {
        try{
            $jssdk = (new WechatInit())->officeAccount()->jssdk->setUrl(\request('sUrl'))->buildConfig([
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'updateTimelineShareData',
                'updateAppMessageShareData',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ], request('debug', false));
            return $this->toResponse(json_decode($jssdk));
        }catch(\Exception $e) {
            return $this->toException($e);
        }
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function weapp(Request $request)
    {
        try {
            $wechat = WechatInit::miniProgram();
            $res = $wechat->auth->session($request->get('code'));
            if ($res && $res['openid']) {
                $socialiteUser = new UserSocialite();
                $finder = $socialiteUser->getUser('wechat', $res['openid']);

                if(!$finder) {
                    $finder = User::create();
                    $socialiteUser->create([
                        'driver' => 'wechat',
                        'userid' => $finder->id,
                        'openid' => $res['openid']
                    ]);
                }

                Auth::login($finder);
                return $this->toResponse([
                    'token' => JWTAuth::fromUser($finder),
                    'expires_in' => Auth::guard('api')->factory()->getTTL() * 60,
                    'openid' => $res['openid'],
                    'session_key' => $res['session_key']
                ]);
            }
            return $this->toResponse($res);
        } catch (\Exception $e) {
            return $this->toException($e);
        }
    }
}
