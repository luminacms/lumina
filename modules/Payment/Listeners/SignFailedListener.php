<?php

namespace Modules\Payment\Listeners;

use Illuminate\Support\Facades\Log;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

/**
 * writeSignFailedLog.
 *
 * @author yansongda <me@yansongda.cn>
 *
 * 说明：此事件将在签名验证失败时抛出。
 * 额外数据：
 * $driver (支付机构)
 * $gateway (支付网关)
 * $data (验签数据)
 *
 */
class SignFailedListener
{
    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle($event)
    {
        Log::warning("{$event->driver} Sign Verify FAILED", $event->data);
    }
}
