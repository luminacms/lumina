<?php declare(strict_types=1);

namespace Modules\Core\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Modules\Core\Traits\JobTrackable;

class BaseJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, JobTrackable;

    const JobFailMessage = [];

    public function __construct(array $params = [])
    {
        $this->prepareStatus();
        $this->params = $params; // Optional
        $this->setInput($this->params); // Optional
    }

    public function getJobName()
    {
        return $this->getName();
    }

    /**
     * @param SyncUser $event
     * @param $exception
     */
    public function failed($exception)
    {
//        $user = \Modules\Core\Models\User::where('user_id', '014718403021411458')->first();
//        $user->notify(new \App\Notifications\JobFaild('failed', [
//            'message' => 'OA任务执行失败：'.static::class.'，异常：'.$exception->getMessage()
//        ]));
    }
}
