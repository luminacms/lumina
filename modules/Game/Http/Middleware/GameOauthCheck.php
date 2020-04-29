<?php
namespace Modules\Game\Http\Middleware;

use Closure;
use Modules\Core\Models\User;
use Modules\Game\Models\GamePage;
use Illuminate\Support\Facades\Cache;
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

        $uid = request('uid');
        $cache_key = 'game_'.$uid;

        $game = Cache::get($cache_key);
        if(!$game) {
            $game = GamePage::where('uid', request('uid'))->first();

            Cache::put($cache_key, $game, now()->addMinutes(10));
        }

        // 无需授权直接过
        if(!$game || !$game->oauth) {
            $game->addCount();
            return $next($request);
        }

        // 已登录直接过
        $_session_social = session('__social');
        // if(!Auth::guest() && isset($_session_social[$game->oauth])) {
        if(isset($_session_social[$game->oauth])) {
            $game->addCount();
            return $next($request);
        }

        // 有code时获取code值
        if($request->get('code')) {
            $user =  UserSocialite::init()->driver($game->oauth)->user();
            User::loginWithSocial($game->oauth, $user->id, $user, $game->oid);

            return redirect()->route('game.show', $game->uid);
        }

        return redirect()->route('ologin', ['driver' => $game->oauth, 'oid' => $game->oid, 'redirect' => route('game.show', $game->uid)]);
    }
}
