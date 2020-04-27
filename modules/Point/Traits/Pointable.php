<?php

namespace Modules\Point\Traits;

use Illuminate\Support\Facades\DB;
use Modules\Point\Models\PointLog;
use Modules\Point\Models\Point;

/**
 * @package Venturecraft\Revisionable
 */
trait Pointable
{

    /**
     * increase
     *
     * @param object $model
     * @param integer $number
     * @param array $options  => ['userid', 'desc', 'type']
     * @return void
     */
    public function pointIncrease(int $number, array $options = [])
    {
        return Point::increase($number, array_merge([
            'model_id' => $this->id,
            'model_type' => $this->getMorphClass()
        ], $options));
    }

    /**
     * decrease point
     *
     * @param integer $number
     * @param string $userid
     * @return void
     */
    public function popintDecrease(int $number, array $options = [])
    {
        return Point::decrease($number, array_merge([
            'model_id' => $this->id,
            'model_type' => $this->getMorphClass()
        ], $options));
    }

    /**
     * roll back point
     *
     * @param integer $id
     * @return void
     */
    public function pointRollback(int $id)
    {
        return PointLog::findOrFail($id)->rollback();
    }

}
