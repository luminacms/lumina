<?php

namespace Modules\ApiTest\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class StoreRequest
 *
 * @package \Modules\ApiTest\Http\Requests
 */
class StoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'method'  => 'string|in:GET,HEAD,POST,PUT,PATCH,DELETE|required',
            'path'    => 'string|required',
            'headers' => 'array',
            'body' => '',
        ];
    }

    public function authorize()
    {
        return true;
    }
}
