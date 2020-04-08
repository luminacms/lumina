<?php declare(strict_types=1);

namespace Modules\Core\Http\Controllers;


class ChartController extends BaseController
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function dataset()
    {
        $chart = urldecode(request('chart'));
        try{
            return (new $chart)->getDataset();
        }catch(\Exception $e) {
            return $this->toError(-1, 'chart class decrypt error');
        }
    }

}
