<?php

namespace Modules\Payment\Listeners;

use Illuminate\Support\Facades\Log;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * writePayStartedLog.
 *
 * @author yansongda <me@yansongda.cn>
 *
 * 说明：此事件将在所有参数处理完毕时抛出。
 * 额外数据：
 * $driver (支付机构)
 * $gateway (支付网关)
 * $endpoint (支付的 url endpoint)
 * $payload (数据)
 */
class PayStartedListener
{

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        Log::info(
            "{$event->driver} {$event->gateway} Has Started",
            [$event->endpoint, $event->payload]
        );
    }
}
