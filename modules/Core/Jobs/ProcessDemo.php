<?php

namespace Modules\Core\Jobs;

class ProcessDemo extends BaseJob
{

    public function handle()
    {
        $a = [1,23,56,7,8,9,4,2,2,3,4,5,6,7,3,5,76];

        $this->setProgressMax(count($a));
        foreach ($a as $k=>$item) {
            sleep(1);
            $this->setProgressNow($k);
        }

        return ['jobid' => $this->job->getJobId()];
    }

}