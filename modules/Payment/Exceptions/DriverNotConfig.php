<?php

namespace Modules\Payment\Exceptions;

class DriverNotConfig extends \Exception
{
    /**
     * Bootstrap.
     *
     * @author yansongda <me@yansonga.cn>
     *
     * @param string       $message
     * @param array|string $raw
     * @param int          $code
     */
    public function __construct($message, $code = '-1')
    {
        parent::__construct('Transaction Driver Not Config: '.$message, $code);
    }
}
