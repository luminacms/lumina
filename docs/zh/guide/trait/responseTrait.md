# ResponseTrait

```php
<?php

namespace Modules\Core\Traits;

use Illuminate\Support\Arr;
use Maatwebsite\Excel\Facades\Excel;

trait ResponseTrait {

    /**
     * @param $model
     * @param $resource
     * @param string $msg
     * @return mixed
     */
    public function toResource($model, $resource, $msg = ''){}

    /**
     * @param $collection
     * @param $resource
     * @param string $msg
     * @return mixed
     */
    public function toCollection($collection, $resource, $msg = ''){}

    /**
     * @param $data
     * @param string $msg
     * @return \Illuminate\Http\JsonResponse
     */
    public function toResponse($data, $msg = ''){}

    /**
     * @param $errcode
     * @param $msg
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function toError($errcode = -1, $msg, array $data = []){}

    /**
     * @param $e
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function toException($e){}

    /**
     * 生成模型详情table
     * @param $obj
     * @param array $except
     * @param array $only
     * @return string
     */
    public function toTable($obj, $except = [], $only = []){}
    
    /**
     * @param $exportClass
     * @param $filename
     * @param string $ext
     * @return \Illuminate\Http\JsonResponse
     */
    public function toAjaxExport($exportClass, $filename = '', $ext = 'xlsx'){}
}
```
