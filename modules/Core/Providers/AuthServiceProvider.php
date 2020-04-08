<?php

namespace Modules\Core\Providers;

use Modules\Core\Models\User;
use Modules\Core\Services\OrgGuard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Modules\Core\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Modules\Core\Models\Organization;
use Modules\Core\Policies\OrganizationPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * 应用的策略映射。
     *
     * @var array
     */
    protected $policies = [
        User::class => UserPolicy::class,
        Organization::class => OrganizationPolicy::class
    ];

    /**
     * 注册任意应用认证、应用授权服务
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // WebTinker policy
        Gate::define('viewWebTinker', function ($user = null) {
            return $user->email == 'jorycn@163.com';
        });

        Auth::extend('org', function ($app, $name, array $config) {
            // 返回一个 Illuminate\Contracts\Auth\Guard 实例...
            return new OrgGuard(Auth::createUserProvider($config['provider'] ?? null), $app['session.store'], $app['request']);
        });

        // Auth::provider('riak', function ($app, array $config) {
        //     // 返回 Illuminate\Contracts\Auth\UserProvider... 实例
        //     return new RiakUserProvider($app->make('riak.connection'));
        // });

    }
}
