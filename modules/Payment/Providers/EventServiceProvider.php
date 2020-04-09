<?php

namespace Modules\Payment\Providers;

use Yansongda\Pay\Events\PayStarted;
use Yansongda\Pay\Events\SignFailed;
use Yansongda\Pay\Events\PayStarting;
use Yansongda\Pay\Events\ApiRequested;
use Yansongda\Pay\Events\MethodCalled;
use Yansongda\Pay\Events\ApiRequesting;
use Yansongda\Pay\Events\RequestReceived;
use Modules\Payment\Listeners\PayStartedListener;
use Modules\Payment\Listeners\SignFailedListener;
use Modules\Payment\Listeners\PayStartingListener;
use Modules\Payment\Listeners\ApiRequestedListener;
use Modules\Payment\Listeners\MethodCalledListener;
use Modules\Payment\Listeners\ApiRequestingListener;
use Modules\Payment\Listeners\RequestReceivedListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        PayStarting::class => [PayStartingListener::class],
        PayStarted::class => [PayStartedListener::class],
        ApiRequesting::class => [ApiRequestingListener::class],
        ApiRequested::class => [ApiRequestedListener::class],
        SignFailed::class => [SignFailedListener::class],
        RequestReceived::class => [RequestReceivedListener::class],
        MethodCalled::class => [MethodCalledListener::class],
    ];
}
