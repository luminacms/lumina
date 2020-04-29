<?php

namespace Modules\Coupon\Models;

use DateTimeInterface;
use Illuminate\Support\Str;
use Modules\Core\Models\BaseModel;
use Illuminate\Support\Facades\Log;
use Modules\Core\Traits\HasCreateBy;
use Illuminate\Database\Eloquent\Collection;
use Modules\Coupon\Http\Filters\CouponFilter;
use Modules\Coupon\Http\Filters\CouponCodeFilter;

/**
 * Class CouponCode.
 *
 * @package namespace Modules\Coupon\Models;
 */
class CouponCode extends BaseModel
{
    use HasCreateBy;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'coupon__codes';
    protected $fillable = ['coupon_id', 'status', 'owner_by', 'received_at', 'used_at', 'expired_at', 'used_at_ip', 'used_tag'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = ['code' => 'like', 'used_at' => ''];
    public function filters()
    {
        return [
            'coupon_id' => CouponFilter::class,
            'status' => CouponCodeFilter::class
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function($model) {
            $model->code = self::getRandom('code', 32);
        });
    }

    /**
     * ownerby
     *
     * @return void
     */
    public function ownerBy()
    {
        return $this->hasOne('Modules\Core\Models\User', 'userid', 'owner_by')->withDefault();
    }

    /**
     * coupon
     *
     * @return void
     */
    public function coupon()
    {
        return $this->hasOne('Modules\Coupon\Models\Coupon', 'uid', 'coupon_id');
    }

    public function scopeValidate($query)
    {
        return $query->whereNull('received_at')->where('expired_at', '>', now());
    }


    /**
     * make coupon code
     *
     * @param [type] $coupon_id
     * @param [type] $num
     * @return void
     */
    public function genCode($coupon_id, $num)
    {
        try{
            $coupon = Coupon::where('uid', $coupon_id)->firstOrFail();

            if(now()->isAfter($coupon->expired_at)){
                return ['msg' => '优惠券已失效，不能再生成优惠码' ];
            }
            // 计算失效期
            $data = [
                'coupon_id' => $coupon_id,
                'create_by' => auth()->guard('org')->user()->userid,
                'created_at' => now(),
                'updated_at' => now()
            ];
            if($coupon->expired_type == Coupon::EXPIRED_TYPE_FIXED) {
                $data['expired_at'] = $coupon->end_at;
            }

            $collect = collect();
            while($num > 0) {
                // $code = self::getRandom('code', 32);
                $code = Str::random(32);
                if(!$collect->contains('code', $code)) {
                    $collect->push(array_merge($data, [
                        'code' => $code
                    ]));
                    $num--;
                }
            }
            self::insert($collect->all());
            return true;
        }catch(\Exception $e) {
            Log::error($e->getMessage());
            return ['msg' => '生成失败，请重试'];
        }
    }

    /**
     * 优惠码状态
     *
     * @return void
     */
    public function getStatusLable()
    {
        $_html = '<span class="layui-badge bg-gray-800">未领取</span>';
        if($this->used_at) {
            $_html = '<span class="layui-badge bg-green-600">已使用</span>';
        }else if(!$this->used_at && $this->received_at) {
            $_html = '<span class="layui-badge bg-yellow-600">已领取</span>';
        }else if(now()->isAfter($this->expired_at)) {
            $_html = '<span class="layui-badge bg-gray-600">已过期</span>';
        }
        return $_html;
    }

    /**
     * 获取优惠码
     *
     * @param [type] $coupon_id
     * @return void
     */
    public static function getCode($coupon_id): array
    {
        try{
            $coupon = Coupon::where('uid', $coupon_id)->first();
            $code = $coupon->code->whereNull('owner_by')->whereNull('received_at')->where('expired_at', '>', now())->first();
            return $code ? [
                'coupon_id' => $coupon_id,
                'title' => $coupon['title'],
                'code' => $code['code'],
                'expired_at' => $code['expired_at']
            ] : [];
        }catch(\Exception $e) {
            return [];
        }
    }

}
