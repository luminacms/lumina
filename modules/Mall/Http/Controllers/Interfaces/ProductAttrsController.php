<?php


namespace Modules\Mall\Http\Controllers\Interfaces;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Mall\Http\Resources\ProductAttrsResource;
use Modules\Mall\Models\ProductAttr;
use Modules\Mall\Models\Repositories\ProductAttrRepository;

class ProductAttrsController extends BaseController
{
    /**
     * @var ProductAttr
     */
    protected $repository;

    public function __construct(ProductAttrRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|mixed
     * @throws \Prettus\Repository\Exceptions\RepositoryException
     */
    public function index(Request $request)
    {

        $productAttrs = $this->repository->paginate($request->get('limit', 15));
        return $this->toCollection($productAttrs, productAttrsResource::class);
    }

}
