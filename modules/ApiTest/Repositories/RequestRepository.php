<?php

namespace Modules\ApiTest\Repositories;

use Illuminate\Support\Str;
use Modules\ApiTest\Collections\RequestCollection;
use Modules\ApiTest\Contracts\RequestRepositoryInterface;
use Modules\ApiTest\Contracts\StorageInterface;
use Modules\ApiTest\Entities\RequestEntity;
use Illuminate\Filesystem\Filesystem;


/**
 * Class DefaultRequestRepository
 *
 * @package \Modules\ApiTest
 */
class RequestRepository implements RequestRepositoryInterface
{
    /**
     * @type \Modules\ApiTest\Collections\RequestCollection
     */
    protected $requests;

    /**
     * @type \Modules\ApiTest\Contracts\StorageInterface
     */
    protected $storage;

    /**
     * RequestRepository constructor.
     *
     * @param \Modules\ApiTest\Contracts\StorageInterface $storage
     * @internal param RequestCollection $requests
     */
    public function __construct(StorageInterface $storage)
    {
        $this->storage = $storage;
        $this->load();
    }

    /**
     * Get data from storage and load it into collection.
     * @return void
     */
    protected function load()
    {
        $this->requests = $this->storage->get();
    }

    /**
     * Replace existing collection with data loaded from storage.
     */
    protected function reload()
    {
        $this->requests = $this->requests->make($this->getDataFromStorage());
    }

    /**
     * Get all stored data storage.
     *
     * @return mixed
     */
    protected function getDataFromStorage()
    {
        return $this->storage->get();
    }

    /**
     * @param int $id
     *
     * @return RequestEntity
     */
    public function find($id)
    {
        return $this->requests->find($id);
    }

    /**
     * @param \Modules\ApiTest\Entities\RequestEntity $request
     *
     * @return mixed
     */
    public function persist(RequestEntity $request)
    {
        $request->setId(Str::random());
        $this->requests->insert($request);
    }

    /**
     * @param int $id
     *
     * @return bool
     */
    public function exists($id)
    {
        return $this->requests->has($id);
    }

    /**
     * @return mixed
     */
    public function all()
    {
        return $this->requests->values();
    }

    /**
     * @param string $id
     */
    public function remove($id)
    {
        $this->find($id)->markToDelete();
    }

    /**
     * @return void
     */
    public function flush()
    {
        $this->storage->put($this->requests);
    }
}
