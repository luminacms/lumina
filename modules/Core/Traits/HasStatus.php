<?php

namespace Modules\Core\Traits;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;

/**
 * @package Venturecraft\Revisionable
 */
trait HasStatus
{
    /**
     * 获取status字段
     *
     * @return void
     */
    public function getStatusName()
    {
        return $this->statusName ?? 'status';
    }

    /**
     * 获取当前status状态
     *
     * @return void
     */
    public function getCurrentStatus()
    {
        return Arr::get($this, $this->getStatusName());
    }

    /**
     * 设置当前状态
     *
     * @param [type] $state
     * @param array $content
     * @return void
     */
    public function setCurrentStatus($state, $content = [])
    {
        return $this->update(array_merge([
            $this->getStatusName() => $state
        ], $content));
    }
}
