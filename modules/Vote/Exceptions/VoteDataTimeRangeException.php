<?php declare(strict_types=1);

namespace Modules\Vote\Exceptions;

use Exception;

class VoteDataTimeRangeException extends Exception
{

    /**
     * OrganizationRequiredException constructor.
     * @param string $message
     * @param array $raw
     * @param int $code
     */
    public function __construct(string $message = '', array $raw = [], int $code = -1)
    {
        $message = $message === '' ? 'Vote time not in range!' : $message;
        parent::__construct($message, intval($code));
    }

}
