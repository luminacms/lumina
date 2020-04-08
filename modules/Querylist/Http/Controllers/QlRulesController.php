<?php

namespace Modules\Querylist\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Querylist\Http\Requests\QlRuleRequest;
use Modules\Querylist\Http\Resources\QlRuleResource;
use Modules\Querylist\Models\QlPost;
use Modules\Querylist\Models\QlRule;
use Modules\Querylist\Models\Repositories\QlRuleRepository;
use phpUri;
use QL\Ext\AbsoluteUrl;
use QL\QueryList;

/**
 * Class QlRulesController.
 *
 * @package namespace Modules\Querylist\Http\Controllers;
 */
class QlRulesController extends BaseController
{
    /**
     * @var QlRule
     */
    protected $repository;

    public function __construct(QlRuleRepository $repository)
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
        if($request->expectsJson()) {
            $qlRules = $this->repository->paginate($request->get('limit', 15));
            return $this->toCollection($qlRules, QlRuleResource::class);
        }
        return view('querylist::qlRules.index');
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        // $this->authorize('create', QlRule::class);
        return view('querylist::qlRules.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  QlRuleCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *

     */
    public function store(QlRuleRequest $request)
    {
        try {
            $qlRule = $this->repository->create($request->all());

            flash('新增操作成功', 'success');
            return redirect()->back();
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
        $qlRule = $this->repository->find($id);
        // $this->authorize('view', $qlRule);
        return $this->toTable($qlRule);
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
        $qlRule = $this->repository->find($id);
        // $this->authorize('update', $qlRule);

        return view('querylist::qlRules.edit', compact('qlRule'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  QlRuleUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *

     */
    public function update(QlRuleRequest $request, $id)
    {
        try {
            $model = $this->repository->find($id);
            // $this->authorize('update', $model);

            $this->repository->find($id)->fill($request->all())->save();

            flash('更新操作成功', 'success');
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
        $model = $this->repository->find($id);
        // $this->authorize('delete', $model);
        $this->repository->delet($id);

        return $this->toResponse([], '删除成功');
    }


    /**
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function query($id, Request $request)
    {
        $rule = $this->repository->find($id);

        $ql = QueryList::getInstance();
        $ql->use(AbsoluteUrl::class);

        $url = $request->get('url');
        $rules = json_decode($rule, true);

        $detail = $data = [];
        if(isset($rules['list'])){
            $data = $ql->get($url)->absoluteUrl($url)->rules($rules['list'])->queryData();
            if(isset($rules['body'])){
                // 详情页
                foreach ($data as $_k => $_item){
                    $_url = \Modules\Core\Utils\PhpUri::parse($_item['link'])->join($_item['link']);
                    $_detail = $ql->get($_item['link'])->absoluteUrl($_item['link'])->rules($rules['body'])->queryData();
                    if(!isset($_detail[0])) continue;

                    $detail[$_k] = QlPost::firstOrCreate(['uuid' => md5($_url)], array_merge($_detail[0], [
                        'url' => $_url,
                        'rule_id' => $id,
                        'uuid' => md5($_url)
                    ]));
                }
            }
        }else if(!isset($rules['list']) && isset($rules['body'])) {
            $detail = $ql->get($url)->absoluteUrl($url)->rules(json_decode($rules['body'], true))->queryData();
            $_url = \Modules\Core\Utils\PhpUri::parse($detail['link'])->join($detail['link']);
            QlPost::firstOrCreate(['uuid' => md5($_url)], array_merge($detail, [
                'url' => $_url,
                'uuid' => md5($_url),
                'rule_id' => $id
            ]));
        }

        return $this->toResponse([], '采集成功');
    }
}
