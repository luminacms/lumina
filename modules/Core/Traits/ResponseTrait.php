<?php

namespace Modules\Core\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;
use Modules\Core\Models\Organization;
use Tymon\JWTAuth\Facades\JWTAuth;

trait ResponseTrait {

    /**
     * @param $model
     * @param $resource
     * @param string $msg
     * @return mixed
     */
    public function toResource($model, $resource, $msg = '')
    {
        $addtions = [
            'errcode' => 0
        ];
        if (!empty($msg)) {
            $addtions['msg'] = $msg;
        }
        return (new $resource($model))->additional($addtions)->response()->withCallback(request('callback'));
    }

    /**
     * @param $collection
     * @param $resource
     * @param string $msg
     * @return mixed
     */
    public function toCollection($collection, $resource, $msg = '')
    {
        $addtions = [
            'errcode' => 0
        ];
        if (!empty($msg)) {
            $addtions['msg'] = $msg;
        }
        return $resource::collection($collection)->additional($addtions)->response()->withCallback(request('callback'));
    }

    /**
     * @param $data
     * @param string $msg
     * @return \Illuminate\Http\JsonResponse
     */
    public function toResponse($data, $msg = '')
    {
        $res = [
            'errcode' => 0,
            'data'    => $data,
        ];
        if (!empty($msg)) {
            $res['msg'] = $msg;
        }
        return  response()->json($res)->withCallback(request('callback'));
    }

    /**
     * @param $errcode
     * @param $msg
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function toError($errcode = -1, $msg, array $data = [])
    {
        $res = [
            'errcode' => $errcode,
            'msg' => $msg,
            'data' => $data
        ];
        flash($msg, 'error');
        return \request()->expectsJson()
                ? response()->json($res)->withCallback(request('callback'))
                : redirect()->back();
    }

    /**
     * @param $exportClass
     * @param $filename
     * @param string $ext
     * @return \Illuminate\Http\JsonResponse
     */
    public function toAjaxExport($exportClass, $filename = '', $ext = 'xlsx')
    {
        $fileTypes = [
            'xlsx' => \Maatwebsite\Excel\Excel::XLSX,
            'xls' => \Maatwebsite\Excel\Excel::XLS,
            'csv' => \Maatwebsite\Excel\Excel::CSV
        ];
        if(!isset($fileTypes[$ext])){
            abort(500, '文件格式不支持!');
        };

        $filename = $filename?$filename: now()->format('YmdHis').'_'.Str::random(5).'#'.auth()->user()->name;
        $myFile = Excel::raw($exportClass, $fileTypes[$ext]);
        $response =  array(
            'name' => $filename.'.'.strtolower($ext), //no extention needed
            'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($myFile) //mime type of used format
        );
        return $this->toResponse($response);
    }


    /**
     * @param $e
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function toException($e)
    {
        report($e);
        if (\request()->ajax() || \request()->expectsJson()) {
            $data = ['errcode'=>500, 'msg'=>$e->getMessage()];
            if(env('APP_DEBUG')){
                $data['trace'] = $e->getTrace();
            }
            return $this->toResponse($data);
        }
        return redirect()->back()->withErrors($e->getMessage())->withInput();;
    }

    /**
     * 生成模型详情table
     * @param $obj
     * @param array $except
     * @param array $only
     * @return string
     */
    public function toTable($obj, $except = [], $only = [])
    {
        $item = $obj->getAttributes();
//        $_html = '<script>function print(){var printWin = window.open(\'打印窗口\', \'_blank\')
//          ,style = [\'<style>\'
//            ,\'body{font-size: 12px; color: #666;}\'
//            ,\'table{width: 100%; border-collapse: collapse; border-spacing: 0;}\'
//            ,\'th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}\'
//            ,\'a{color: #666; text-decoration:none;}\'
//            ,\'*.layui-hide{display: none}\'
//          ,\'</style>\'].join(\'\')
//          ,html = $("#j_detail"); //输出表头
//
//          printWin.document.write(style + html.prop(\'outerHTML\'));
//          printWin.document.close();
//          printWin.print();
//          printWin.close();}</script>';
        $_html = '<div class="layui-card relative" id="j_detail"><div class="layui-card-body"><table class="layui-table"><tbody><tr><td colspan="2" class="bg-gray-400">基本信息</td></tr>';

        if(count($item) > 0){
            $filtered = count($only)>0?Arr::only($item, $only):Arr::except($item, $except);
            $objCast = $obj->getCasts();
            foreach ($filtered as $_key => $_item) {
                if(isset($objCast[$_key]) && $objCast[$_key] == 'array') {
                    $_json = '';
                    $_item = json_decode($_item, true);
                    if(is_array($_item)){
                        foreach ($_item as $_jk => $_ji) {
                            $_json .= '<dd>'.$_jk.'：'.$_ji.'</dd>';
                        }
                    }
                    $_html .= '<tr><td width="120">'.__("core::field.".$_key).'</td><td><pre class="layui-code"><dl>'.($_json).'</dl></pre></td></td></tr>';
                }else{
                    $_html .= '<tr><td width="120">'.__("core::field.".$_key).'</td><td>'.$_item.'</td></td></tr>';
                }
            }
        }else{
            $_html .= '<tr><td colspan="2">数据获取错误</td></td></tr>';
        }

        if(count($obj->getRelations())>0){
            // 关联表
            foreach ($obj->getRelations() as $_key => $_rel) {
                $_html .= '</tr><tr><td colspan="2" class="bg-gray-400" height="35">'.$_key.'</td></td></tr>';
                $_attr = '';
                foreach ($_rel->toArray() as $__k => $__item) {
                    if(!is_array($__item)){
                        $_attr .= '<tr><td>'.$__k.'</td><td>'.$__item.'</td></tr>';
                    }else{
                        $_attr .= '<tr><td>'.($__k+1).'</td><td><table class="layui-table">'.array_to_info(Arr::except($__item, 'pivot'), 'table').'</table></td></td></tr>';
                    }
                }
                $_html .= '<tr>'.$_attr.'</tr>';
            }
        }

        $_html .= '</tbody></table></div></div>';
        return $_html;
    }
}
