<?php

namespace Modules\Vote\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCount;

/**
 * Class VoteOption.
 *
 * @package namespace Modules\Vote\Models;
 */
class VoteOption extends BaseModel
{
    use HasCount;

    const STATUS_PENDING = 'pending';
    const STATUS_OK = 'ok';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'vote__options';
    protected $fillable = ['value', 'type', 'isright', 'thumb', 'count', 'cheat_count', 'vote_id', 'subject_id', 'name', 'mobile', 'status', 'profile'];


    public function vote()
    {
        return $this->belongsTo('Modules\Vote\Models\Vote', 'vote_id', 'id');
    }

    public function voteLog()
    {
        return $this->hasMany('Modules\Vote\Models\VoteLog', 'option_id', 'id');
    }

    /**
     * 获取排行榜
     * @param $vote_id
     * @param string $subject_id
     * @param bool $hasCheat
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function getRank($vote_id, $subject_id = '', $hasCheat = true)
    {
        $options = self::where('vote_id', $vote_id);
        if($subject_id) {
            $options->where('subject_id', $subject_id);
        }
        $options = $options->get();
        if($hasCheat) {
            $options->transform(function($item) {
                $item->count = array_sum([$item->count, $item->cheat_count]);
                unset($item->cheat_count);
                return $item;
            });
        }
        return array_values($options->sortByDesc('count')->toArray());
    }

    public function getLastTimes($request)
    {
        $count = 0;
        $vote = $this->vote;
        switch ($vote->rule) {
            case Vote::RULE_DEVICE:
                $count = intval($vote->rule_times - VoteLog::where([
                        ['vote_id', $vote['id']],
                        ['deviceid', $request->get('deviceid')]
                    ])->count());
                break;
            case Vote::RULE_IP:
                $count = intval($vote->rule_times - VoteLog::where([
                        ['vote_id', $vote['id']],
                        ['create_ip', $request->getClientIp()]
                    ])->count());
                break;
        }

        return $count<0?0:$count;
    }

}
