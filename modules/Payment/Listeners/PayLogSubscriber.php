<?php

namespace Modules\Payment\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Yansongda\Pay\Log;

class PayLogSubscriber implements ShouldQueue
{
    use InteractsWithQueue;

    public $queue = 'high';
    /**
     * 为订阅者注册监听器。
     *
     * @param  Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            Yansongda\Pay\Events\PayStarting::class,
            'Modules\Payment\Listeners\PayLogSubscriber@PayStarting'
        );
        $events->listen(
            Yansongda\Pay\Events\PayStarted::class,
            'Modules\Payment\Listeners\PayLogSubscriber@PayStarted'
        );
        $events->listen(
            Yansongda\Pay\Events\ApiRequesting::class,
            'Modules\Payment\Listeners\PayLogSubscriber@ApiRequesting'
        );
        $events->listen(
            Yansongda\Pay\Events\ApiRequested::class,
            'Modules\Payment\Listeners\PayLogSubscriber@ApiRequested'
        );
        $events->listen(
            Yansongda\Pay\Events\SignFailed::class,
            'Modules\Payment\Listeners\PayLogSubscriber@SignFailed'
        );
        $events->listen(
            Yansongda\Pay\Events\RequestReceived::class,
            'Modules\Payment\Listeners\PayLogSubscriber@RequestReceived'
        );
        $events->listen(
            Yansongda\Pay\Events\MethodCalled::class,
            'Modules\Payment\Listeners\PayLogSubscriber@MethodCalled'
        );
    }

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
     * @return void
     */
    public function PayStarting($event)
    {
        Log::debug("Starting To {$event->driver}", [$event->gateway, $event->params]);
    }

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
     *
     * @return void
     */
    public function PayStarted($event)
    {
        Log::info(
            "{$event->driver} {$event->gateway} Has Started",
            [$event->endpoint, $event->payload]
        );
    }

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
     *
     * @return void
     */
    public function ApiRequesting($event)
    {
        Log::debug("Requesting To {$event->driver} Api", [$event->endpoint, $event->payload]);
    }

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
     * @return void
     */
    public function ApiRequested($event)
    {
        Log::debug("Result Of {$event->driver} Api", $event->result);
    }

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
     * @return void
     */
    public function SignFailed($event)
    {
        Log::warning("{$event->driver} Sign Verify FAILED", $event->data);
    }

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
    public function RequestReceived($event)
    {
        Log::info("Received {$event->driver} Request", $event->data);
//        PayLog::create([
//            'type' => 'notify',
//            'driver' => $event->driver,
//            'gateway' => $event->gateway,
//            'output' => $event->data,
//            'create_ip' => request()->ip()
//        ]);
    }

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
     * @return void
     */
    public function MethodCalled($event)
    {
        Log::info("{$event->driver} {$event->gateway} Method Has Called", [$event->endpoint, $event->payload]);
    }
}
