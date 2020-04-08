<?php

namespace Modules\Querylist\Http\Controllers\Interfaces;

use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;
use Modules\Querylist\Models\QlPost;
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
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function test($rule_id, Request $request)
    {
        $request->validate(['rules' => 'required', 'url' => 'required']);

        $ql = QueryList::getInstance();
        $ql->use(AbsoluteUrl::class);

        $url = $request->get('url');
        $rules = $request->get('rules');

        $detail = $data = [];
        if(isset($rules['list'])){
            $data = $ql->get($url)->absoluteUrl($url)->rules(json_decode($rules['list'], true))->queryData();
            if(isset($rules['body'])){
                // 详情页
                foreach ($data as $_k => $_item){
                    $_url = \Modules\Core\Utils\PhpUri::parse($_item['link'])->join($_item['link']);
                     $_detail = $ql->get($_item['link'])->absoluteUrl($_item['link'])->rules(json_decode($rules['body'], true))->queryData();
                     if(!isset($_detail[0])) continue;

                    $detail[$_k] = QlPost::firstOrCreate(['uuid' => md5($_url)], array_merge($_detail[0], [
                        'url' => $_url,
                        'rule_id' => $rule_id,
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
                'rule_id' => $rule_id
            ]));
        }
        return $this->toResponse(count($detail)>0?$detail:$data);
    }

    /**
     * @param $rule_id
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore($rule_id, Request $request)
    {
        $request->validate(['ids' => 'required']);

        $ids = $request->get('ids');
        $r = QlPost::withTrashed()->where('rule_id', $rule_id)->whereIn('id', $ids)->restore();
        return $this->toResponse($r);
    }
}
