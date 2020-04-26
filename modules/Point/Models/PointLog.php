<?php

namespace Modules\Point\Models;

use Modules\Core\Traits\HasOrg;
use Modules\Core\Traits\HasTrace;
use Illuminate\Support\Facades\DB;
use Modules\Core\Models\BaseModel;
use Illuminate\Support\Facades\Log;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class PointLog.
 *
 * @package namespace Modules\Point\Models;
 */
class PointLog extends BaseModel
{
    use HasOrg, HasCreateBy, HasTrace;

    const TYPE_INCREASE = 'increase';
    const TYPE_DECREASE = 'decrease';

    const STATUS_CANCEL = 'cancel';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'point__point_logs';
    protected $fillable = ['model_type', 'model_id', 'type', 'status','count', 'desc', 'oid', 'create_by', 'trace_ip', 'trace_agent', 'point_id','point_type','left_count'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    public static $typeMap = [
        self::TYPE_INCREASE => '增加',
        self::TYPE_DECREASE => '减少',
    ];

    /**
     * rollback point
     *
     * @return void
     */
    public function rollback()
    {
        $point = Point::findOrFail($this->point_id);
        if($this->status == self::STATUS_CANCEL) {
            return false;
        }
        try{
            return DB::transaction(function () use($point) {
                if($this->type == self::TYPE_INCREASE) {
                    $point->decrement('count', $this->count);
                }else if($this->type == self::TYPE_DECREASE){
                    $point->increment('count', $this->count);
                }
                $this->update(['status' => self::STATUS_CANCEL]);

                return true;
            });
        }catch(\Exception $e) {
            Log::error($e->getMessage());
            return false;
        }
    }

}
