<?php

namespace Modules\Game\Traits;

/**
 * @package Venturecraft\Revisionable
 */
trait HasAnalyze
{
    protected $countColumn = 'count';


    public function addCount($amount = 1)
    {
        $this->increment($this->countColumn, $amount);
    }

}
