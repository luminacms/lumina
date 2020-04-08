<?php
/**
 * Created by PhpStorm.
 * User: lifeilin
 * Date: 2016/10/28
 * Time: 14:16
 */

namespace Modules\Doc\Http\Controllers;


use Illuminate\Http\Request;
use Modules\Core\Http\Controllers\BaseController;

class WidgetController extends BaseController
{
    /**
     * 添加或编辑文档
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function editDocument(Request $request)
    {
        $id = intval($request->input('id',0));

        if($id > 0){
            $this->data['title'] = '获取订单接口';
        }
        $this->data['method'] = 'saveDocument';
        $this->data['type'] = 1;
        $this->data['inputTitle'] = '文档名称';

        return view('widget.editDocument',$this->data);
    }

    /**
     * 添加或编辑目录
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function editCatalog(Request $request)
    {
        $catalog_id = intval($request->input('id'));
        $this->data['method'] = 'saveCatalog';
        $this->data['type'] = 0;
        $this->data['inputTitle'] = '目录名称';

        if($catalog_id){
            $this->data['title'] = '订单';
        }
        return view('widget.editDocument',$this->data);
    }
}
