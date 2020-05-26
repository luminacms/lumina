<?php

namespace Modules\Shop\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Modules\Shop\Models\Order;
use Modules\Shop\Policies\OrderPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * 应用的策略映射。
     *
     * @var array
     */
    protected $policies = [
        Order::class => OrderPolicy::class
    ];

    /**
     * 注册任意应用认证、应用授权服务
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
    }
}
