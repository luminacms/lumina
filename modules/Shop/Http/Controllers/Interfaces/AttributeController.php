<?php

namespace Modules\Shop\Http\Controllers\Interfaces;

use Modules\Core\Http\Controllers\BaseController;
use Modules\Shop\Http\Requests\AttributeRequest;
use Modules\Shop\Http\Requests\AttributeValueRequest;
use Modules\Shop\Models\Spec;
use Modules\Shop\Models\SpecValue;

class AttributeController extends BaseController
{
    protected $attr;
    protected $attrVal;

    public function __construct(Spec $attr, SpecValue $attrVal)
    {
        $this->attr = $attr;
        $this->attrVal = $attrVal;
    }

    /**
     * 创建属性
     *
     * @param AttributeRequest $request
     * @return void
     */
    public function create(AttributeRequest $request)
    {
        $attr = $this->attr->firstOrCreate(['name' => $request->get('name')], $request->only('name'));
        $val = $attr->vals()->firstOrCreate(['value' => $request->get('value')], [
            'value' => $request->only('value'),
            'spec_id' => $attr->id
        ]);

        return $this->toResponse($val);
    }

    /**
     * 新增属性值
     *
     * @param AttributeValueRequest $request
     * @return void
     */
    public function createVal(AttributeValueRequest $request)
    {
        $res = $this->attrVal->firstOrCreate(
            ['spec_id' => $request->get('spec_id'), 'value'=>$request->get('value') ],
            $request->only(['spec_id', 'value'])
        );
        return $this->toResponse($res);

    }
}
