<?php

namespace Modules\Payment\Listeners;

use Modules\Payment\Events;
use Modules\Payment\Log;
use Modules\Payment\Models\PayLog;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class KernelLogSubscriber implements EventSubscriberInterface
{
    /**
     * Returns an array of event names this subscriber wants to listen to.
     *
     * The array keys are event names and the value can be:
     *
     *  * The method name to call (priority defaults to 0)
     *  * An array composed of the method name to call and the priority
     *  * An array of arrays composed of the method names to call and respective
     *    priorities, or 0 if unset
     *
     * For instance:
     *
     *  * array('eventName' => 'methodName')
     *  * array('eventName' => array('methodName', $priority))
     *  * array('eventName' => array(array('methodName1', $priority), array('methodName2')))
     *
     * @return array The event names to listen to
     */
    public static function getSubscribedEvents()
    {
        return [
            Events::PAY_STARTING     => ['writePayStartingLog', 256],
            Events::PAY_STARTED      => ['writePayStartedLog', 256],
            Events::API_REQUESTING   => ['writeApiRequestingLog', 256],
            Events::API_REQUESTED    => ['writeApiRequestedLog', 256],
            Events::SIGN_FAILED      => ['writeSignFailedLog', 256],
            Events::REQUEST_RECEIVED => ['writeRequestReceivedLog', 256],
            Events::METHOD_CALLED    => ['writeMethodCalledLog', 256],
        ];
    }

    /**
     * writePayStartingLog.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param Events\PayStarting $event
     *
     * @return void
     */
    public function writePayStartingLog(Events\PayStarting $event)
    {
        Log::debug("Starting To {$event->driver}", [$event->gateway, $event->params]);
    }

    /**
     * writePayStartedLog.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param Events\PayStarted $event
     *
     * @return void
     */
    public function writePayStartedLog(Events\PayStarted $event)
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
     * @param Events\ApiRequesting $event
     *
     * @return void
     */
    public function writeApiRequestingLog(Events\ApiRequesting $event)
    {
        Log::debug("Requesting To {$event->driver} Api", [$event->endpoint, $event->payload]);
    }

    /**
     * writeApiRequestedLog.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param Events\ApiRequested $event
     *
     * @return void
     */
    public function writeApiRequestedLog(Events\ApiRequested $event)
    {
        Log::debug("Result Of {$event->driver} Api", $event->result);
    }

    /**
     * writeSignFailedLog.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param Events\SignFailed $event
     *
     * @return void
     */
    public function writeSignFailedLog(Events\SignFailed $event)
    {
        Log::warning("{$event->driver} Sign Verify FAILED", $event->data);
    }

    /**
     * writeRequestReceivedLog.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param Events\RequestReceived $event
     *
     * @return void
     */
    public function writeRequestReceivedLog(Events\RequestReceived $event)
    {
        Log::info("Received {$event->driver} Request", $event->data);
        PayLog::create([
            'type' => 'notify',
            'driver' => $event->driver,
            'gateway' => $event->gateway,
            'output' => $event->data,
            'create_ip' => request()->ip()
        ]);
    }

    /**
     * writeMethodCalledLog.
     *
     * @author yansongda <me@yansongda.cn>
     *
     * @param Events\MethodCalled $event
     *
     * @return void
     */
    public function writeMethodCalledLog(Events\MethodCalled $event)
    {
        Log::info("{$event->driver} {$event->gateway} Method Has Called", [$event->endpoint, $event->payload]);
    }
}
