<?php

namespace Modules\Payment\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Yansongda\Pay\Events\PayStarting;

/**
 * writePayStartingLog.
 *
 * @author yansongda <me@yansongda.cn>
 *
 * @param Events\PayStarting $event
 * 说明：此事件将在最开始进行支付时进行抛出。此时 SDK 只进行了相关初始化操作，其它所有操作均未开始。
 *   $driver (支付机构)
 *   $gateway (支付网关)
 *   $params (传递的原始参数)
 *
 */
class PayStartingListener
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(PayStarting $event)
    {
        Log::debug("Starting To {$event->driver}", [$event->gateway, $event->params]);
    }
}
