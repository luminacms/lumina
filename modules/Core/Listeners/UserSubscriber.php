<?php

namespace Modules\Core\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Modules\Core\Models\User;

class UserSubscriber implements ShouldQueue
{
    use InteractsWithQueue;

    public $queue = 'high';
    /**
     * 为订阅者注册监听器。
     *
     * @param  Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        // 用户认证
        $events->listen(
            'Illuminate\Auth\Events\Login',
            'Modules\Core\Listeners\UserSubscriber@LogSuccessfulLogin'
        );
        $events->listen(
            'Illuminate\Auth\Events\Logout',
            'Modules\Core\Listeners\UserSubscriber@LogSuccessfulLogout'
        );
    }



    public function LogSuccessfulLogin()
    {
        // organzation 加持
//        $_oid = request('oid');
//        if(!$_oid && auth()->org()) {
//            return $next($request);
//        }else{
//            session()->forget('__org');
//            $_user = Auth::user();
//            if($_user->hasRole('SUPER') || ($_user->hasOrg($_oid)  && $_user->hasAnyRole(['ADMIN']))) {
//                if(!$_oid) {
//                    // oid参数不存在，管理员取任意oid，普通管理员取自身所在组织
//                    $_oid = $_user->hasRole('SUPER')?Organization::first()->oid:$_user->oid;
//                }
//                $org = Organization::where('oid', $_oid)->first();
//                session(['__org' => $org]);
//                return request('oid')?$next($request):redirect()->route('dashboard', $_oid);
//            }else{
//                flash('暂无权限，请确定你在该组织中且是管理员身份', 'error');
//                Auth::logout();
//            }
//            session()->save();
//        }

//        return redirect('/');
        User::logLogin();
    }

    public function LogSuccessfulLogout()
    {
        // 清空org
        app('session')->forget('__org');
        app('session')->forget('__social');
    }
}
