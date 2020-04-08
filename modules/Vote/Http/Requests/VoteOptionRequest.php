<?php

namespace Modules\Vote\Http\Requests;

use Modules\Core\Http\Requests\BaseRequest;
use Modules\Vote\Http\Requests\Rules\VoteRule;

class VoteOptionRequest extends BaseRequest
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
                        'vid' => [
                            'required',
                            new VoteRule
                        ]
                    ];
                }
            // UPDATE
            case 'PUT':
            case 'PATCH':
                {
                    return [
                        // UPDATE ROLES
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
}
