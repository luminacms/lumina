<?php

namespace Modules\ApiTest\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class UpdateRequest
 *
 * @package \Modules\ApiTest\Http\Requests
 */
class UpdateRequest extends FormRequest
{
    public function rules()
    {
        return [
            'id' => 'required'
        ];
    }

    public function authorize(){
        return true;
    }
}
