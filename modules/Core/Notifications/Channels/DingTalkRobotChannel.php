<?php

namespace Modules\Core\Notifications\Channels;

use Clockwork\Request\Log;
use Illuminate\Notifications\Notification;

class DingTalkRobotChannel
{
    /**
     * Send the given notification.
     *
     * @param  mixed  $notifiable
     * @param  \Illuminate\Notifications\Notification  $notification
     * @return void
     */
    public function send($notifiable, Notification $notification)
    {
        $body = $notification->toArray($notifiable);
        $r = \Dingtalk::robot()->send('robot/send?access_token='.$body['token'], 'markdown', $body['body'], $body['at']);

        return;
    }
}
