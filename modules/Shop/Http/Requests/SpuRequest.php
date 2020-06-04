<?php

namespace Modules\Shop\Http\Requests;

use Illuminate\Validation\ValidationException;
use Modules\Core\Http\Requests\BaseRequest;
use Modules\Shop\Models\Sku;

class SpuRequest extends BaseRequest
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
                        'name' => 'required',
                        'brand_id' => 'required',
                        'category_id' =>'required',
                        'sku' => 'required'
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

    /**
     * 检查sku uid重复
     *
     * @return void
     */
    public function checkUniqueSkuid()
    {
        $sku = collect($this->get('sku'));

        $skuGrouped = $sku->groupBy('uid');
        if($skuGrouped->count() != $sku->count()) {
            // 提交的skuid重复
            return false;
        }

        // 检查数据库
        if(Sku::whereIn('uid', $skuGrouped->keys())->exists()) {
            return false;
        }
        return true;
    }
}
