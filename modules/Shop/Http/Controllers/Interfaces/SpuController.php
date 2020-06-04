<?php

namespace Modules\Shop\Http\Controllers\Interfaces;

use Illuminate\Http\Request;
use Modules\Shop\Models\Spu;
use Modules\Shop\Models\Spec;
use Modules\Shop\Models\SpecValue;
use Modules\Shop\Http\Requests\AttributeRequest;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Shop\Http\Requests\AttributeValueRequest;

class SpuController extends BaseController
{
    protected $spec;
    protected $specVal;

    public function __construct(Spec $spec, SpecValue $specVal)
    {
        $this->spec = $spec;
        $this->specVal = $specVal;
    }

    /**
     * 创建属性
     *
     * @param AttributeRequest $request
     * @return void
     */
    public function sku(Request $request)
    {
        $request->validate(['spec_id' => 'required', 'spu_id' => 'required']);

        return $this->toResponse(Spu::getSpecData($request->get('spec_id'), $request->get('spu_id')));
    }


}
