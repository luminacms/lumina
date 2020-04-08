<?php

namespace Modules\ApiTest\Contracts;

use Modules\ApiTest\Collections\RequestCollection;

/**
 * Class StorageInterface
 *
 * @package \Modules\ApiTest\Contracts
 */
interface StorageInterface
{

    /**
     * Get data from resource.
     *
     * @return RequestCollection
     */
    public function get();

    /**
     * Put data to resource.
     *
     * @param $data RequestCollection
     * @return void
     */
    public function put(RequestCollection $data);
}
