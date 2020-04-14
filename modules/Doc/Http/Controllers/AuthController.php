<?php
namespace Modules\Doc\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Doc\Models\Member;
use Illuminate\Routing\Controller as Controller;
use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AuthController extends BaseController
{
    use AuthenticatesUsers;

    /**
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function oa()
    {
        $_config = config('xpassport');
        $query = http_build_query([
            'client_id' => $_config['client_id'],
            'redirect_uri' => $_config['redirect_uri'],
            'response_type' => 'code',
            'scope' => '',
            'state' => csrf_token()
        ]);
        return redirect($_config['uri'].'/oauth/authorize?'.$query);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function passport(Request $request)
    {
        if($request->input('state') !== csrf_token()){
            abort(401, '状态码失效，请重新再试');
        }
        $http = new \GuzzleHttp\Client();

        $response = $http->post(config('xpassport.uri').'/oauth/token', [
            'form_params' => [
                'grant_type' => 'authorization_code',
                'client_id' => config('xpassport.client_id'),
                'client_secret' => config('xpassport.client_secret'),
                'redirect_uri' => config('xpassport.redirect_uri'),
                'code' => $request->code,
            ],
        ]);
        $reponse =  $response->getBody()->getContents();
        $res = json_decode($reponse, true);

        $http2Request = $http->request('GET',config('xpassport.uri').'/interface/user', [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer '.$res['access_token'],
            ]
        ]);
        $response2 = $http2Request->getBody()->getContents();
        $info = json_decode($response2, true);

        // 系统登录
        $member = Member::where('userid', $info['userid'])->first();
        if(!$member) {
            $member = new Member();
        }
        $member->userid = $info['userid'];
        $member->nickname = $info['name'];
        $member->account = $info['mobile'];
        $member->email = $info['email'];
        $member->last_login_time = date('Y-m-d H:i:s');
        $member->headimgurl = isset($info['avatar'])?$info['avatar']:'http://doc.sxmgcm.cn/static/images/middle.gif';

        $member->save();
        session_member($member);

//        Auth::login($user, true);
        return  redirect('/');
    }
}
