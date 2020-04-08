<?php

namespace Modules\Core\Http\Requests;

class OrganizationRequest extends BaseRequest
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
                        'name' => 'required|unique:core_organizations',
                        'sort' => 'required'
                    ];
                }
            // UPDATE
            case 'PUT':
            case 'PATCH':
                {
                    return [
                        'name' => 'required',
                        'sort' => 'required'
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
