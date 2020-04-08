<?php

namespace Modules\Vod\Models;

use Illuminate\Support\Facades\Log;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;
use Modules\Core\Traits\HasUnique;
use Modules\Payment\Facades\Pay;
use Modules\Payment\Models\PayTransaction;
use Modules\Payment\Traits\HasPayment;
use Modules\Vod\Http\Resources\CourseResource;
use Modules\Vod\Http\Resources\LessonApiResource;
use Modules\Vod\Models\Repositories\CourseRepository;
use Modules\Vod\Models\Repositories\LessonRepository;

/**
 * Class VodOrder.
 *
 * @package namespace Modules\Vod\Models;
 */
class VodOrder extends BaseModel
{
    use HasCreateBy, HasUnique, HasOrg, HasPayment;

    const TYPE_COURSE = 'course';
    const TYPE_LESSON = 'lesson';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'vod__orders';
    protected $fillable = ['order_id', 'create_by', 'model_type', 'model_id', 'status', 'price', 'expired_at', 'payed_at', 'created_at_ip'];


    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->order_id) {
                $model->order_id = self::getOrder('order_id', 'v');
            }
            $model->created_at_ip = request()->ip();
        });
    }


    /**
     * @param $type
     * @param $model_id
     * @return mixed
     */
    public static function makeOrder($type, $model_id)
    {
        switch ($type){
            case self::TYPE_LESSON:
                return self::_makeLessonOrder($model_id);
                break;
            case self::TYPE_COURSE:
                return self::_makeCourseOrder($model_id);
                break;
        }
    }


    /**
     * @param $id
     * @return array
     */
    protected static function _makeCourseOrder($id)
    {
        $model = app(CourseRepository::class)->find($id);
        if(!$model) return ['errcode' => 404, 'msg' => '专栏不存在'];

        if(self::isPayed('course', $id)) {
            return ['errcode' => 400, 'msg' => '专栏已经付过费'];
        }

        $orderData = [
            'model_type' => self::TYPE_COURSE,
            'model_id' => $id,
            'status' => PayTransaction::STATUS_NOPAY,
            'price' => $model->getOrderPrice(),
            'expired_at' => now()->addMinutes(config('vod.order_expired'))
        ];
        $order = self::create($orderData);
        return self::__makePay('【专栏】'.$model->title, $order);
    }

    /**
     * @param $id
     * @param LessonRepository $lesson
     * @return mixed
     */
    protected static function _makeLessonOrder($id)
    {
        $model = app(LessonRepository::class)->find($id);
        if(!$model) return ['errcode' => 404, 'msg' => '课程不存在'];

        if(self::isPayed('lesson', $id)) {
            return ['errcode' => 400, 'msg' => '课程不需付费或已经付过费'];
        }

        $orderData = [
            'model_type' => self::TYPE_LESSON,
            'model_id' => $id,
            'status' => PayTransaction::STATUS_NOPAY,
            'price' => $model->getOrderPrice(),
            'expired_at' => now()->addMinutes(config('vod.order_expired'))
        ];
        $order = self::create($orderData);
        return self::__makePay('【课程】'.$model->title, $order);
    }

    /**
     * @param $title
     * @param $order
     * @return array
     */
    protected static function __makePay($title, $order)
    {
        $payload = [
            'out_trade_no' => PayTransaction::makeTransaction(
                self::class,
                option('PAYMENT_ALIPAY_APPID'),
                PayTransaction::DRIVER_ALIPAY,
                'app',
                $order->order_id,
                $order->price
            ),
            'subject' => $title,
            'total_amount' => $order->price,
        ];

        return array_merge(['order' => $order], [
            'url' => Pay::alipay()->app($payload)->getContent(),
            'transaction_id' => $payload['out_trade_no']
        ]);
    }

    /**
     * @param $type
     * @param $id
     * @return mixed
     */
    public static function isPayed($type, $id)
    {
        $pass = false;
        if ($type == 'course') {
            // 专栏直接验证订单
            $pass = !auth()->guest()?self::where([
                ['create_by', auth()->user()->getKey()],
                ['model_type', 'course'],
                ['model_id', $id],
                ['status', PayTransaction::STATUS_SUCCESS]
            ])->exists():false;
        }else if($type == 'lesson') {
            // 课节验证
            $lesson = Lesson::withoutGlobalScopes(['oid'])->find($id);
            if(!$lesson) {
                $pass = false;
            }

            if($lesson->pay_type == Lesson::PAY_TYPE_FREE) {
                $pass = true;
            }else if(in_array($lesson->pay_type, [Lesson::PAY_TYPE_SELF, Lesson::PAY_TYPE_PARENT])) {
                if(!auth()->guest()) {
                    if($lesson->pay_type == Lesson::PAY_TYPE_PARENT) {
                        $pass = self::where([
                            ['create_by', auth()->user()->getKey()],
                            ['model_type', 'course'],
                            ['model_id', $lesson->course_id],
                            ['status', PayTransaction::STATUS_SUCCESS]
                        ])->exists();
                    }else if($lesson->pay_type == Lesson::PAY_TYPE_SELF){
                        $pass = self::where([
                            ['create_by', auth()->user()->getKey()],
                            ['model_type', 'lesson'],
                            ['model_id', $lesson->id],
                            ['status', PayTransaction::STATUS_SUCCESS]
                        ])->exists();
                    }
                }
            }
        }

        return $pass;
    }

    /**
     * @param $type
     * @param $id
     * @return bool
     */
    public static function checkModelExist($type, $id)
    {
        if(!in_array($type, ['lesson', 'course'])){
            return false;
        }
        if($type == 'course') {
            return Course::exists($id);
        }else if($type == 'lesson'){
            return Lesson::exists($id);
        }
        return false;
    }

    /**
     * @return mixed
     */
    public static function getModel($type, $model_id)
    {
        return $type==='lesson'?
            new LessonApiResource(Lesson::find($model_id)):
            new CourseResource(Course::find($model_id));
    }

    /**
     * @param $model_id
     * @param $transaction
     */
    public function PaymentUpdate($model_id, $transaction)
    {
        $_order = self::withoutGlobalScopes(['oid'])->where('order_id', $model_id)->first();
        if(!$_order) {
            Log::error('VOD订单支付异常#'.$model_id);
            return;
        }
        if($transaction->status == PayTransaction::STATUS_SUCCESS) {
            if($transaction->total_fee == $_order->price) {
                $_order->update([
                    'status' => PayTransaction::STATUS_SUCCESS,
                    'payed_at' => $transaction->payment_at
                ]);
            }else{
                // 支付金额异常
                $_order->update([
                    'status' => PayTransaction::STATUS_PAYERROR
                ]);
            }
        }else{
            $_order->update([
                'status' => $transaction->status ?? PayTransaction::STATUS_NOPAY
            ]);
        }
    }

}
