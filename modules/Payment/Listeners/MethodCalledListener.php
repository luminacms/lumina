<?php

namespace Modules\Payment\Listeners;

use Illuminate\Support\Facades\Log;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * writeMethodCalledLog.
 *
 * @author yansongda <me@yansongda.cn>
 *
 * 说明：此事件将在调用除 PAYMETHOD 方法（例如，查询订单，退款，取消订单）时抛出
 * 额外数据：
 * $driver (支付机构)
 * $gateway (调用方法)
 * $endpoint (支付的 url endpoint)
 * $payload (数据)
 *
 */
class MethodCalledListener
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        Log::info("{$event->driver} {$event->gateway} Method Has Called", [$event->endpoint, $event->payload]);
    }
}
