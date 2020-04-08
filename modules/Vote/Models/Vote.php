<?php

namespace Modules\Vote\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCount;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Vote.
 *
 * @package namespace Modules\Vote\Models;
 */
class Vote extends BaseModel
{
    use HasCount, HasCreateBy;

    // 投票类型
    const TYPE_DEFAULT = 'form'; // 报名
    const TYPE_VOTE = 'vote'; // 投票
    const TYPE_QUIZ = 'wj'; //问卷

    // 数据提交规则
    const RULE_IP = 'ip';
    const RULE_DEVICE = 'device';
    const RULE_WECHAT = 'wechat';

    protected $hashConnect = 'vote';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'vote__votes';
    protected $fillable = [
        'title', 'type', 'notice_webhook', 'notice_interval', 'last_noticed_at', 'start_at', 'end_at', 'description', 'rule', 'count',
        'create_by','rule_times', 'content','topics', 'addon_fields'];
    public $dates = ['start_at', 'end_at', 'last_noticed_at'];

    /**
     * @return array
     */
    public static function getTypes()
    {
        return [
            self::TYPE_DEFAULT => '报名',
            self::TYPE_VOTE => '投票',
            self::TYPE_QUIZ => '问卷'
        ];
    }

    public static function getRules()
    {
        return [
            '' => '--',
            self::RULE_IP => 'IP限制',
            self::RULE_DEVICE => '设备限制',
            self::RULE_WECHAT => '微信'
        ];
    }

    public function voteData()
    {
        return $this->hasMany('Modules\Vote\Models\VoteData', 'vote_id', 'id');
    }

    /**
     * @return mixed
     */
    public function scopeUnderway()
    {
        $_now = now();
        return $this->where([
            ['start_at', '<', $_now],
            ['end_at', '>', $_now],
        ]);
    }

    public function subjects()
    {
        return $this->hasMany('Modules\Vote\Models\VoteSubject', 'vote_id', 'id');
    }

    public function options()
    {
        return $this->hasMany('Modules\Vote\Models\VoteOption', 'vote_id', 'id');
    }

    public function getTotalCount()
    {
        return array_sum([$this->options()->sum('count'), $this->options()->sum('cheat_count')]);
    }

}
