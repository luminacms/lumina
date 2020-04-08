<?php

namespace Modules\Core\Exceptions;

use Exception;

class OrganizationRequiredException extends Exception
{

    /**
     * OrganizationRequiredException constructor.
     * @param string $message
     * @param array $raw
     * @param int $code
     */
    public function __construct($message = '', $raw = [], $code = -1)
    {
        $message = $message === '' ? 'Unknown Error' : $message;
        $this->raw = is_array($raw) ? $raw : [$raw];

        parent::__construct($message, intval($code));
    }

}
