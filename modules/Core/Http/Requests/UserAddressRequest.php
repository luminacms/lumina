<?php

namespace Modules\Core\Http\Requests;

class UserAddressRequest extends BaseRequest
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
                        'userid' => 'required',
                        'province' => 'required',
                        'city' => 'required',
                        'district' => 'required',
                        'address' => 'required',
                        'contact_name' => 'required',
                        'contact_phone' => 'required',
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
