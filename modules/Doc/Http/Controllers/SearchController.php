<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2017/1/16 0016
 * Time: 11:02
 */

namespace Modules\Doc\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Doc\Models\Project;
use Modules\Core\Http\Controllers\BaseController;

class SearchController extends BaseController
{
    public function search(Request $request)
    {
        //如果没有启用匿名访问
//        if(!wiki_config('ENABLE_ANONYMOUS',false) && empty($this->member)){
//            return redirect(route('account.login'));
//        }

        $keyword = $request->get('keyword');
        $pageIndex = intval($request->input('page',1));

        $this->data['lists'] =  Project::search($keyword,$pageIndex,20);
        $this->data['keyword'] = $keyword;

        //var_dump($this->data);exit;
        return view('doc::search.search',$this->data);
    }
}
