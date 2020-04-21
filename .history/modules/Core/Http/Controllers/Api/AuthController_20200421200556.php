<?php


namespace Modules\Core\Http\Controllers\Api;


use Modules\Core\Traits\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Models\User;
use Xbhub\Socialite\SocialiteManager;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends BaseController
{
    use AuthenticatesUsers;

    protected $socialite;
    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->socialite = new SocialiteManager([
            'github' => [
                'client_id'     => option('SOCIAL_OAUTH_GITHUB_CLIENT_ID'),
                'client_secret' => option('SOCIAL_OAUTH_GITHUB_CLIENT_ID'),
                'redirect'      => option('SOCIAL_OAUTH_GITHUB_CLIENT_ID'),
            ],
            'toutiao' => [
                'client_id' => option('SOCIAL_OAUTH_TOUTIAO_CLIENT_ID'),
                'client_secret' => option('SOCIAL_OAUTH_TOUTIAO_CLIENT_SECRET'),
                'redirect' => option('SOCIAL_OAUTH_TOUTIAO_REDIRECT')
            ],
            'wechat' => [
                'client_id' => option('SOCIAL_OAUTH_WECHAT_CLIENT_ID'),
                'client_secret' => option('SOCIAL_OAUTH_WECHAT_CLIENT_ID'),
                'redirect' => option('SOCIAL_OAUTH_WECHAT_CLIENT_ID')
            ]
        ]);
    }


    /**
     * @param $driver
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function codeLogin($driver, Request $request)
    {
        $request->validate([
            'code' => 'required',
            'userinfo' => 'required'
        ]);
        $user =  $this->socialite->driver($driver)->getUserByCode(
            $request->get('code'),
            json_decode($request->get('userinfo'), true),
            $request->all()
        );

        Log::info('【'.$driver.'】'.json_encode($user));

        User::loginWithSocial($driver, $user->id, $user);
        return $this->toResponse([
            'token' => JWTAuth::fromUser(\auth()->user()),
            'userinfo' => \auth()->user(),
            'expired_at' => now()->addMinutes(Auth::guard('api')->factory()->getTTL())->timestamp
        ]);
    }


    /**
     * @return \Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response|void
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login()
    {
        $this->validateLogin($this->request);

        if ($this->hasTooManyLoginAttempts($this->request)) {
            $this->fireLockoutEvent($this->request);

            return $this->sendLockoutResponse($this->request);
        }

        if ($this->attemptLogin($this->request)) {
            return \request()->expectsJson()?$this->toResponse([
                'token' => JWTAuth::fromUser(auth()->user()),
                'expired_at' => now()->addMinutes(Auth::guard('api')->factory()->getTTL())->timestamp
            ]):redirect()->route('dashboard');
        }
        return $this->sendFailedLoginResponse($this->request);
    }

}
