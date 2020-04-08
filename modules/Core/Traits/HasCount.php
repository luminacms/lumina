<?php

namespace Modules\Core\Traits;

/**
 * @package Venturecraft\Revisionable
 */
trait HasCount
{
    protected $countColumn = 'count';

    public function scopeBycount()
    {
        // TODO
    }

    public function addCount($amount = 1)
    {
        $this->increment($this->countColumn, $amount);
    }

    public function subCount($amount = 1)
    {
        $this->decrement($this->countColumn, $amount);
    }
}
