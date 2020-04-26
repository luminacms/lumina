<?php

namespace Modules\Core\Traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

/**
 * @package Venturecraft\Revisionable
 */
trait HasTrace
{
    /**
     * update trace
     *
     * @return void
     */
    public static function bootHasTrace()
    {
        static::creating(function ($model) {
            $model->trace_ip = request()->getClientIp();
            $model->trace_agent = request()->userAgent();
        });
    }

}
