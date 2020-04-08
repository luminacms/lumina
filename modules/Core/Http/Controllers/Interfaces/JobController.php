<?php

namespace Modules\Core\Http\Controllers\Interfaces;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Core\Models\JobStatus;

class JobController extends BaseController
{

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function status(Request $request)
    {
        $request->validate(['id' => 'required']);

        $status = JobStatus::where('job_id', $request->get('id'))->first();
        if(!$status) {
            return $this->toError(-1, 'status not exist!');
        }

        return $this->toResponse([
            'status' => $status->status,
            'percent' => $status->status=='finished'?1:($status->progress_max>0?round($status->progress_now / $status->progress_max, 2):0),
            'finished_at' => $status->finished_at
        ]);
    }
}