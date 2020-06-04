<?php

namespace Modules\Shop\Http\Controllers;

use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Shop\Models\Spec;
use Modules\Shop\Http\Requests\SpecRequest;
use Modules\Shop\Http\Resources\SpecResource;

/**
 * Class SpecController.
 *
 * @package namespace Modules\Shop\Http\Controllers;
 */
class SpecController extends BaseController
{
    /**
     * @var Spec
     */
    protected $spec;

    public function __construct(Spec $spec)
    {
        $this->spec = $spec;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $spec = $this->spec->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($spec, SpecResource::class);
        }
        return view('shop::spec.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Spec::class);
        return view('shop::spec.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  SpecCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(SpecRequest $request)
    {
        try {
            $spec = $this->spec->saveSpecValues($request);

            if($request->expectsJson()) {
                return $this->toResponse($spec, 'success');
            }

            flash('create success', 'success');
            return redirect()->back()->withInput();
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
        $spec = $this->spec->with('vals')->findOrFail($id);
        // $this->authorize('view', $spec);
        return view('shop::spec.edit', compact('spec'));
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
        $spec = $this->spec->with('vals')->findOrFail($id);
        // $this->authorize('update', $spec);

        return view('shop::spec.edit', compact('spec'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  SpecUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(SpecRequest $request, $id)
    {
        try {
            $model = $this->spec->findOrFail($id);
            // $this->authorize('update', $model);

            $model->fill($request->all());
            if(!$model->isDirty()) {
                return $this->toError(-1, 'nothing changed');
            }
            $model->saveSpecValues($request);
            if($request->expectsJson()) {
                return $this->toResponse($model, 'update success');
            }

            flash('update success', 'success');
            return redirect()->back();
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
        $model = $this->spec->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], 'delete success');
    }
}
