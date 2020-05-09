<?php

namespace Modules\Shop\Http\Controllers\Interfaces;

use Modules\Core\Http\Controllers\BaseController;
use Modules\Shop\Http\Requests\AttributeRequest;
use Modules\Shop\Http\Requests\AttributeValueRequest;
use Modules\Shop\Models\Attribute;
use Modules\Shop\Models\AttributeValue;

class AttributeController extends BaseController
{
    protected $attr;
    protected $attrVal;

    public function __construct(Attribute $attr, AttributeValue $attrVal)
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
        $val = $this->attrVal->firstOrCreate(['value' => $request->get('value')], [
            'value' => $request->only('value'),
            'attr_id' => $attr->id
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
            ['attr_id' => $request->get('attr_id'), 'value'=>$request->get('value') ],
            $request->only(['attr_id', 'value'])
        );
        return $this->toResponse($res);

    }
}
