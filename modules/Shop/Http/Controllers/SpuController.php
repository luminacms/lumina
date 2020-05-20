<?php

namespace Modules\Shop\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Shop\Models\Sku;
use Modules\Shop\Models\Spu;
use Illuminate\Support\Facades\DB;
use Modules\Shop\Http\Requests\SpuRequest;
use Modules\Shop\Http\Resources\SpuResource;
use Illuminate\Validation\ValidationException;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Shop\Models\Spec;

/**
 * Class SpuController.
 *
 * @package namespace Modules\Shop\Http\Controllers;
 */
class SpuController extends BaseController
{
    /**
     * @var Spu
     */
    protected $spu;

    public function __construct(Spu $spu)
    {
        $this->spu = $spu;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $spu = $this->spu->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($spu, SpuResource::class);
        }
        return view('shop::spu.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Spu::class);
        return view('shop::spu.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SpuCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(SpuRequest $request)
    {
        try {
            if(!$request->checkUniqueSkuid()){
                flash('sku_id已存在', 'error');

                return !$request->expectsJson()
                ? redirect()->back()->withInput()
                : $this->toError(-1, 'sku_id已存在');
            }

            $res = DB::transaction(function () use($request) {
                $spu = $this->spu->create($request->all());
                foreach($request->get('sku') as $_skuItem) {
                    $sku = Sku::firstOrCreate(['uid' => $_skuItem['uid']], array_merge($_skuItem, ['spu_id' => $spu->uid]));
                    if(isset($_skuItem['spec_val_ids'])){
                        $sku->specVals()->attach(explode(',', $_skuItem['spec_val_ids']));
                    }
                }

                flash('create success', 'success');
                return $spu;
            });

            return !$request->expectsJson()
                    ? redirect()->back()->withInput()
                    : $this->toResponse(['redirect' => route('shop.spu.index')], 'success');
        } catch (ValidationException $e) {
            return $this->toException($e);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $spu = $this->spu->findOrFail($id);
        // $this->authorize('view', $spu);
        return $this->toTable($spu);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $spu = $this->spu->findOrFail($id);

        $spec_attr = Spec::whereIn('id', explode(',', $spu->spec_ids))->with('vals')->get()->map(function($sp) {
            return [
                'group_id'=> $sp['id'],
                'group_name' => $sp['name'],
                'spec_items' => $sp->vals->map(function($item) {
                    return [
                        'item_id' => $item['id'].'',
                        'spec_value' => $item['value']
                    ];
                })->toArray()
            ];
        })->toArray();
        $spec_list = $spu->sku->map(function($sku) {
            return [
                'spec_val_ids' => $sku->specVals->implode('id', ',').'',
                'form' => [
                    'readonly' => true,
                    'uid'=> $sku->uid,
                    'market_price_fee' => $sku->market_price_fee,
                    'price_fee'=> $sku->price_fee,
                    'stock'=> $sku->stock,
                    'weight'=> $sku->weight,
                ]
            ];
        })->toArray();

        // $this->authorize('update', $spu);

        return view('shop::spu.edit', compact('spu', 'spec_attr', 'spec_list'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  SpuUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(SpuRequest $request, $id)
    {
        try {
            $model = $this->spu->findOrFail($id);
            // $this->authorize('update', $model);

            if(!$model->isDirty()) {
                return $this->toError([], 'nothing changed');
            }
            if($model->fill($request->all())->save()){
                flash('update success', 'update success');

                return !$request->expectsJson()
                    ? redirect()->back()
                    : $this->toResponse($model, 'update success');
            }
        } catch (ValidationException $e) {
            return $this->toException($e);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = $this->spu->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], '删除成功');
    }
}
