<?php

namespace Modules\Vote\Http\Requests;

use Modules\Core\Http\Requests\BaseRequest;
use Modules\Core\Exceptions\VoteDataTimeRangeException;

class VoteDataRequest extends BaseRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch($this->method())
        {
            // CREATE
            case 'POST':
                {
                    return [
                        'name' => 'required'
                    ];
                }
            // UPDATE
            case 'PUT':
            case 'PATCH':
                {
                    return [
                        'name' => 'required'
                    ];
                }
            case 'GET':
            case 'DELETE':
            default:
                {
                    return [];
                };
        }
    }

    /**
     * 检查报名时间是否在设置范围内
     *
     * @param [type] $voteData
     * @param [type] $request
     * @return void
     */
    public function checkTimeValidate($vote, $request)
    {
        if($vote->start_at && now()->isBefore($vote->start_at)) {
            abort(400, '活动尚未开始');
        }
        if($vote->end_at && now()->isAfter($vote->end_at)) {
            abort(400, '活动已经结束');
        }

        return true;
    }
}
