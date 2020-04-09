<?php

namespace Modules\Payment\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

/**
 * writeApiRequestingLog.
 *
 * @author yansongda <me@yansongda.cn>
 *
 * 说明：此事件将在请求支付方的 API 前抛出。
 * 额外数据：
 * $driver (支付机构)
 * $gateway (支付网关)
 * $endpoint (支付的 url endpoint)
 * $payload (数据)
 */
class ApiRequestingListener
{

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        Log::debug("Requesting To {$event->driver} Api", [$event->endpoint, $event->payload]);
    }
}
