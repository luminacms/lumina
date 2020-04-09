<?php

namespace Modules\Payment\Listeners;

use Illuminate\Support\Facades\Log;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * writeRequestReceivedLog.
 *
 * @author yansongda <me@yansongda.cn>
 *
 * 说明：此事件将在收到支付方的请求（通常在异步通知或同步通知）时抛出
 * 额外数据：
 * $driver (支付机构)
 * $gateway (支付网关)
 * $data (收到的数据)
 *
 * @return void
 */
class RequestReceivedListener
{

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        Log::info("Received {$event->driver} Request", $event->data);
    }
}
