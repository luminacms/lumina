<?php

namespace Modules\Payment\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class PayLog.
 *
 * @package namespace Modules\Payment\Models;
 */
class PayLog extends BaseModel
{
    protected $table = 'payment__logs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['type', 'driver', 'gateway', 'endpoint', 'input', 'output', 'create_ip','request_id'];
    protected $casts = [
        'input' => 'array',
        'output' => 'array'
    ];

}
