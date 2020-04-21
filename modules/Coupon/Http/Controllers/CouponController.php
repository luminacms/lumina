<?php

namespace Modules\Coupon\Http\Controllers;

use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Coupon\Models\Coupon;
use Modules\Coupon\Http\Requests\CouponRequest;
use Modules\Coupon\Http\Resources\CouponResource;

/**
 * Class CouponController.
 *
 * @package namespace Modules\Coupon\Http\Controllers;
 */
class CouponController extends BaseController
{
    /**
     * @var Coupon
     */
    protected $coupon;

    public function __construct(Coupon $coupon)
    {
        $this->coupon = $coupon;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $coupon = $this->coupon->withCount('code')->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($coupon, CouponResource::class);
        }
        return view('coupon::coupon.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Coupon::class);
        return view('coupon::coupon.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CouponCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(CouponRequest $request)
    {
        try {
            $coupon = $this->coupon->create($request->all());
            flash('create success', 'create success');

            return !$request->expectsJson()
                    ? redirect()->back()->withInput()
                    : $this->toResponse($coupon, 'success');
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
        $coupon = $this->coupon->findOrFail($id);
        // $this->authorize('view', $coupon);
        return $this->toTable($coupon);
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
        $coupon = $this->coupon->findOrFail($id);
        // $this->authorize('update', $coupon);

        return view('coupon::coupon.edit', compact('coupon'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CouponUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(CouponRequest $request, $id)
    {
        try {
            $model = $this->coupon->findOrFail($id);
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
        $model = $this->coupon->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], '删除成功');
    }
}
