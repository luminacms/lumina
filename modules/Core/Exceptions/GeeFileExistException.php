<?php declare(strict_types=1);

namespace Modules\Core\Exceptions;

use Exception;

class GeeFileExistException extends Exception
{

    /**
     * OrganizationRequiredException constructor.
     * @param string $message
     * @param array $raw
     * @param int $code
     */
    public function __construct(string $message = '', array $raw = [], int $code = -1)
    {
        $message = $message === '' ? 'File already existed!' : $message;
        parent::__construct($message, intval($code));
    }

}
