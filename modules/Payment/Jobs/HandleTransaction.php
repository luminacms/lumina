<?php

namespace Modules\Payment\Jobs;

use Modules\Core\Jobs\BaseJob;
use Illuminate\Support\Facades\Log;
use Modules\Payment\Models\PayTransaction;

class HandleTransaction extends BaseJob
{

    public function handle()
    {
        // 关闭过期订单
        // Log::info('transaction close at:'.now());
        PayTransaction::withoutGlobalScopes(['oid'])->where('expired_at', '<', now())->whereIn('status', [
            PayTransaction::STATUS_NOPAY
        ])->each(function($item){
            $item->update([
                'status' => PayTransaction::STATUS_CLOSED
            ]);
        });
    }

}