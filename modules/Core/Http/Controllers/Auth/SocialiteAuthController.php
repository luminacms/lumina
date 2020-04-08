<?php


namespace Modules\Core\Http\Controllers\Auth;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Models\User;
use Modules\Core\Models\UserSocialite;
use Xbhub\Socialite\SocialiteManager;

class SocialiteAuthController extends BaseController
{
    protected $socialite;

    public function __construct()
    {
        $this->socialite = UserSocialite::init();
    }

    /**
     * @param $driver
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirectToProvider($driver, $oid, Request $request)
    {
        if($_redirect = $request->get('redirect')) {
            return $this->socialite->driver($driver)->withRedirectUrl($_redirect)->redirect();
        }else{
            return $this->socialite->driver($driver)->redirect();
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function handleProviderCallback($driver, $oid, Request $request)
    {
        $user =  $this->socialite->driver($driver)->user();
        User::loginWithSocial($driver, $user->id, $user, $oid);

        return redirect()->back();
    }
}
