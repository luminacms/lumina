<?php

namespace Modules\Toutiao\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasOrg;
use Modules\Payment\Traits\HasPayment;

class TTPay extends BaseModel
{
    use HasPayment;
}
