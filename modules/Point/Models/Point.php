<?php

namespace Modules\Point\Models;

use Modules\Core\Traits\HasOrg;
use Illuminate\Support\Facades\DB;
use Modules\Core\Models\BaseModel;
use Illuminate\Support\Facades\Log;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Point.
 *
 * @package namespace Modules\Point\Models;
 */
class Point extends BaseModel
{
    use HasOrg, HasCreateBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'point__points';
    protected $fillable = ['type','count', 'oid', 'create_by'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    public function pointLog()
    {
        return $this->hasMany('Modules\Point\Models\PointLog', 'point_id');
    }

    /**
     * 获取积分总数
     *
     * @param string $userid
     * @param string $type 积分类型
     * @return void
     */
    public static function total($type = '', $userid = '')
    {
        $userid = $userid ?: auth()->user()->userid;

        $model = Point::when($type, function($query, $val){
            return $query->where('type', $val);
        });

        return [
            'total' => intval($model->sum('count')),
            'user_total' => intval($model->count()),
            'my' => $model->where('create_by', $userid)->first()->count ?? 0
        ];
    }


    /**
     * increase point
     *
     * @param integer $count
     * @param array $options
     * @return void
     */
    public static function increase($count, array $options = [])
    {
        try{
            $userid = $options['userid'] ?? auth()->user()->userid;
            $count = intval($count) > 0 ? intval($count) : 0;
            if($count > 0) {
                $_type = $options['type'] ?? '';
                $point = Point::where('create_by', $userid)->when($_type, function($query, $val){
                    return $query->where('type', $val);
                })->first();

                return DB::transaction(function () use($point, $count, $options, $_type) {
                    $left_count = $count;
                    if($point) {
                        $point->increment('count',  $count);
                        $left_count = $point->count;
                    }else{
                        $point = self::create([
                            'type' => $_type,
                            'count' => $count
                        ]);
                    }
                    // 插入日志
                    PointLog::create([
                        'model_type' => $options['model_type'] ?? null,
                        'model_id' => $options['model_id'] ?? null,
                        'point_id' => $point->id,
                        'point_type' => $point->type,
                        'type' => PointLog::TYPE_INCREASE,
                        'count' => $count,
                        'left_count' => $left_count,
                        'desc' => $options['desc'] ?? ''
                    ]);

                    return $point;
                });
            }
        }catch(\Exception $e){
            Log::error($e);
            return Point::class;
        }
    }


    /**
     * decrease point
     *
     * @param integer $count
     * @param array $options
     * @return void
     */
    public static function decrease(int $count, array $options = [])
    {
        try{
            $userid = $options['userid'] ?? auth()->user()->userid;
            $count = intval($count) > 0 ? intval($count) : 0;

            if($count > 0) {
                $_type = $options['type'] ?? '';
                $point = Point::where('create_by', $userid)->when($_type, function($query, $val){
                    return $query->where('type', $val);
                })->first();

                return DB::transaction(function () use($point, $count, $options) {
                    if($point && $point->count > 0) {
                        // 不存在负数且原有计数大于0
                        $count = $count > $point->count ? $point->count : $count;
                        $point->decrement('count',  $count);

                        // 插入日志
                        PointLog::create([
                            'model_type' => $options['model_type'] ?? null,
                            'model_id' => $options['model_id'] ?? null,
                            'point_id' => $point->id,
                            'point_type' => $point->type,
                            'type' => PointLog::TYPE_DECREASE,
                            'count' => $count,
                            'left_count' => $point->count,
                            'desc' => $options['desc'] ?? ''
                        ]);

                        return $point;
                    }
                });
            }
        }catch(\Exception $e){
            Log::error($e);
            return Point::class;
        }
    }

}
