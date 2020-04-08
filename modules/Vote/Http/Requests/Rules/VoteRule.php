<?php

namespace Modules\Vote\Http\Requests\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Modules\Vote\Models\Vote;
use Modules\Vote\Models\VoteLog;

class VoteRule implements Rule
{
    protected $message;
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        try{
            $vote = Vote::findOrFail($value);
            switch ($vote->rule) {
                case Vote::RULE_IP:
                    return $this->validateIp($vote);
                    break;
                case Vote::RULE_WECHAT:
                    return $this->validateWechat($vote);
                    break;
                case Vote::RULE_DEVICE:
                default:
                    return $this->validateDevice($vote);
                    break;
            }
        }catch (\Exception $e){
            Log::error($e);
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message ?? '您已提交过了，请明日重试';
    }

    /**
     * @param $vote
     * @return bool
     */
    private function validateIp($vote)
    {
        return VoteLog::where([
            ['vote_id', $vote->id],
            ['create_ip', request()->getClientIp()]
        ])->count() < $vote->rule_times;
    }

    /**
     * @param $vote
     * @return bool
     */
    private function validateDevice($vote)
    {
        return VoteLog::where([
                ['vote_id', $vote->id],
                ['deviceid', request('deviceid')]
            ])->count() < $vote->rule_times;
    }

    private function validateWechat($vote)
    {
        return true;
    }
}
