<?php

namespace Modules\Shop\Http\Controllers;

use Modules\Core\Http\Controllers\BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Modules\Shop\Models\Category;
use Modules\Shop\Http\Requests\CategoryRequest;
use Modules\Shop\Http\Resources\CategoryResource;

/**
 * Class CategoryController.
 *
 * @package namespace Modules\Shop\Http\Controllers;
 */
class CategoryController extends BaseController
{
    /**
     * @var Category
     */
    protected $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     */
    public function index(Request $request)
    {
        if($request->expectsJson()) {
            $category = $this->category->filter($request)->paginate($request->get('limit', 15));
            return $this->toCollection($category, CategoryResource::class);
        }
        return view('shop::category.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', Category::class);
        return view('shop::category.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CategoryCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(CategoryRequest $request)
    {
        try {
            $category = $this->category->create($request->all());
            flash('create success', 'success');

            return !$request->expectsJson()
                    ? redirect()->back()->withInput()
                    : $this->toResponse($category, 'success');
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
        $category = $this->category->findOrFail($id);
        // $this->authorize('view', $category);
        return $this->toTable($category);
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
        $category = $this->category->findOrFail($id);
        // $this->authorize('update', $category);

        return view('shop::category.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  CategoryUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     */
    public function update(CategoryRequest $request, $id)
    {
        try {
            $model = $this->category->findOrFail($id);
            // $this->authorize('update', $model);

            $model->fill($request->all());
            if(!$model->isDirty()) {
                return $this->toError(-1, 'nothing changed');
            }
            if($model->save()){
                flash('update success', 'success');
                
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
        $model = $this->category->findOrFail($id);
        // $this->authorize('delete', $model);
        $model->delete();

        flash('delete success', 'success');
        return $this->toResponse([], 'delete success');
    }
}
