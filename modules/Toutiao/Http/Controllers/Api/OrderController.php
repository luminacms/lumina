<?php

namespace Modules\Toutiao\Http\Controllers\Api;

use Illuminate\Http\Request;
use Modules\Toutiao\Models\TTPay;
use Modules\Payment\Models\PayTransaction;
use Modules\Core\Http\Controllers\BaseController;

class OrderController extends BaseController
{

    public function makeOrder(TTPay $ttpay, Request $request)
    {
        $request->validate(['total' => 'required', 'title' => 'required']);
        //        makeTransaction(string $order_id, string $driver, string $gateway, float $total_amount, string $title)
        $order = $ttpay->makeTransaction(now()->timestamp, PayTransaction::DRIVER_TTPAY, 'app', $request->get('total'), $request->get('title'));
        return $this->toResponse($order);
    }

    public function countTrans()
    {
        $count = PayTransaction::where([
            ['create_by', \auth()->user()->user_id],
            ['status', PayTransaction::STATUS_SUCCESS]
        ])->count();
        return $this->toResponse(['count' => $count]);
    }
}
