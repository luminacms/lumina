<?php

namespace Modules\Wechat\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'Overtrue\LaravelWeChat\Events\WeChatUserAuthorized' => [
            'Modules\Wechat\Listeners\WeChatUserAuthorizedListener'
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }

    /**
     * 需要注册的订阅者类。
     *
     * @var array
     */
    protected $subscribe = [

    ];
}
