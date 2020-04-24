<?php

namespace Modules\Coupon\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Modules\Coupon\Models\CouponCode;
use Modules\Coupon\Policies\CouponCodePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * 应用的策略映射。
     *
     * @var array
     */
    protected $policies = [
        CouponCode::class => CouponCodePolicy::class
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
