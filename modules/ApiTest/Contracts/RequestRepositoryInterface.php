<?php

namespace Modules\ApiTest\Contracts;

use Modules\ApiTest\Entities\RequestEntity;

interface RequestRepositoryInterface
{
    /**
     * @param $id
     *
     * @return \Modules\ApiTest\Entities\RequestEntity
     */
    public function find($id);

    /**
     * @param \Modules\ApiTest\Entities\RequestEntity $request
     *
     * @return void
     */
    public function persist(RequestEntity $request);

    /**
     * @param $id
     *
     * @return bool
     */
    public function exists($id);

    /**
     * @return \Modules\ApiTest\Collections\RequestCollection|\Modules\ApiTest\Entities\RequestEntity[]
     */
    public function all();

    /**
     * @return void
     */
    public function flush();

    /**
     * @param string $request
     */
    public function remove($request);

}
