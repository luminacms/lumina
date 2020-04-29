<?php

namespace Modules\Coupon\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Coupon\Models\Coupon;
use Modules\Coupon\Models\CouponCode;
use Modules\Coupon\Exports\CouponCodeExport;
use Illuminate\Validation\ValidationException;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Coupon\Http\Requests\CouponCodeRequest;
use Modules\Coupon\Http\Resources\CouponCodeResource;

/**
 * Class CouponCodeController.
 *
 * @package namespace Modules\Coupon\Http\Controllers;
 */
class CouponCodeController extends BaseController
{
    /**
     * @var CouponCode
     */
    protected $couponCode;

    public function __construct(CouponCode $couponCode)
    {
        $this->couponCode = $couponCode;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $couponCode = $this->couponCode->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($couponCode, CouponCodeResource::class);
        }
        return view('coupon::couponCode.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', CouponCode::class);
        return view('coupon::couponCode.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CouponCodeCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(CouponCodeRequest $request)
    {
        try {
            $couponCode = $this->couponCode->create($request->all());
            flash('create success', 'create success');

            return !$request->expectsJson()
                    ? redirect()->back()->withInput()
                    : $this->toResponse($couponCode, 'success');
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
        $couponCode = $this->couponCode->findOrFail($id);
        // $this->authorize('view', $couponCode);
        return $this->toTable($couponCode);
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
        $couponCode = $this->couponCode->findOrFail($id);
        // $this->authorize('update', $couponCode);

        return view('coupon::couponCode.edit', compact('couponCode'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CouponCodeUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(CouponCodeRequest $request, $id)
    {
        try {
            $model = $this->couponCode->findOrFail($id);
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
        $model = $this->couponCode->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], '删除成功');
    }

    /**
     * make coupon code
     *
     * @param Request $request
     * @return void
     */
    public function make(Request $request)
    {
        $request->validate(['number' => 'required|numeric|max:10000', 'coupon_id' => 'required']);

        $r = $this->couponCode->genCode($request->get('coupon_id'), $request->get('number'));
        return $r['msg']? $this->toError(-1, $r['msg']) : $this->toResponse($r);
    }

    /**
     * export code
     *
     * @param Request $request
     * @return void
     */
    public function export(Request $request)
    {
        $request->validate(['coupon_id' => 'required']);

        $this->toAjaxExport(new CouponCodeExport($request->get('ids'), ['coupon_id' => request('coupon_id')]));
    }
}
