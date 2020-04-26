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
        $userid = $options['userid'] ?? auth()->user()->userid;
        $number = intval($number) > 0 ? intval($number) : 0;

        if($number > 0) {
            $_type = $options['type'] ?? '';
            $point = Point::where('create_by', $userid)->when($_type, function($query, $val){
                return $query->where('type', $val);
            })->first();

            DB::transaction(function () use($point, $number, $options, $_type) {
                $left_count = $number;
                if($point) {
                    $point->increment('count',  $number);
                    $left_count = $point->count;
                }else{
                    $point = Point::create([
                        'type' => $_type,
                        'count' => $number
                    ]);
                }
                // 插入日志
                PointLog::create([
                    'model_type' => $this->getMorphClass(),
                    'model_id' => $this->id,
                    'point_id' => $point->id,
                    'point_type' => $point->type,
                    'type' => PointLog::TYPE_INCREASE,
                    'count' => $number,
                    'left_count' => $left_count,
                    'desc' => $options['desc'] ?? ''
                ]);
            });
        }
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
        $userid = $options['userid'] ?? auth()->user()->userid;
        $number = intval($number) > 0 ? intval($number) : 0;

        if($number > 0) {
            $_type = $options['type'] ?? '';
            $point = Point::where('create_by', $userid)->when($_type, function($query, $val){
                return $query->where('type', $val);
            })->first();

            DB::transaction(function () use($point, $number, $options) {
                if($point && $point->count > 0) {
                    // 不存在负数且原有计数大于0
                    $number = $number > $point->count ? $point->count : $number;
                    $point->decrement('count',  $number);

                    // 插入日志
                    PointLog::create([
                        'model_type' => $this->getMorphClass(),
                        'model_id' => $this->id,
                        'point_id' => $point->id,
                        'point_type' => $point->type,
                        'type' => PointLog::TYPE_DECREASE,
                        'count' => $number,
                        'left_count' => $point->count,
                        'desc' => $options['desc'] ?? ''
                    ]);
                }
            });
        }
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
