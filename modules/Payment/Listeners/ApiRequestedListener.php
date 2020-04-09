<?php

namespace Modules\Payment\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

 /**
 * writeApiRequestedLog.
 *
 * @author yansongda <me@yansongda.cn>
 *
 * 说明：此事件将在请求支付方的 API 完成之后抛出。
 * 额外数据：
 * $driver (支付机构)
 * $gateway (支付网关)
 * $endpoint (支付的 url endpoint)
 * $result (请求后的返回数据)
 *
 */
class ApiRequestedListener
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        Log::debug("Result Of {$event->driver} Api", $event->result);
    }
}
