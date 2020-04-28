<?php
namespace Modules\Game\Http\Middleware;

use Closure;
use Modules\Core\Models\User;
use Modules\Game\Models\GamePage;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Models\UserSocialite;

class GameOauthCheck
{
    /**
     * @param [type] $request
     * @param Closure $next
     * @return void
     */
    public function handle($request, Closure $next)
    {
    	if(\request('old')) {
    		return $next($request);
    	}

        $case = GamePage::where('uid', request('uid'))->first();

        // 无需授权直接过
        if(!$case || !$case->oauth) {
            $case->addCount();
            return $next($request);
        }

        // 已登录直接过
        $_session_social = session('__social');
        // if(!Auth::guest() && isset($_session_social[$case->oauth])) {
        if(isset($_session_social[$case->oauth])) {
            $case->addCount();
            return $next($request);
        }

        // 有code时获取code值
        if($request->get('code')) {
            $user =  UserSocialite::init()->driver($case->oauth)->user();
            User::loginWithSocial($case->oauth, $user->id, $user, $case->oid);

            return redirect()->route('game.show', $case->uid);
        }

        return redirect()->route('ologin', ['driver' => $case->oauth, 'oid' => $case->oid, 'redirect' => route('game.show', $case->uid)]);
    }
}
