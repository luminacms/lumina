<?php

namespace Modules\ApiTest\Collections;

use Modules\ApiTest\Entities\RequestEntity;
use Illuminate\Support\Collection;

/**
 * Class RequestCollection
 *
 * @package \Modules\ApiTest
 */
class RequestCollection extends Collection
{

    /**
     * Find specific request by passed identificator.
     *
     * @param string $id
     *
     * @return \Modules\ApiTest\Entities\RequestEntity|null
     */
    public function find($id)
    {
        return $this->offsetExists($id) ? $this->offsetGet($id) : null;
    }

    /**
     * Put new RequestEntity to collection.
     *
     * @param \Modules\ApiTest\Entities\RequestEntity $request
     *
     * @return \Modules\ApiTest\Entities\RequestEntity
     */
    public function insert(RequestEntity $request)
    {
        $this->put($request->getId(), $request);

        return $request;
    }

    /**
     * Load data to collection.
     *
     * @param $data
     * @return static
     */
    public function load($data)
    {
        foreach ($data as $row) {
            $this->put($row['id'], RequestEntity::createExisting($row));
        }

        return $this;
    }

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    |
    */

    /**
     * Новые записи или измененные записи, которые не были помечены на удаление.
     *
     * @return static
     */
    public function onlyDiff()
    {
        return $this->filter(function (RequestEntity $request) {
            return ($request->notExists() || $request->isDirty()) && $request->notMarkedToDelete();
        });
    }

    /**
     * Только не помеченные на удаление
     *
     * @return static
     */
    public function onlyNotMarkedToDelete(){
        return $this->filter(function (RequestEntity $request) {
            return $request->notMarkedToDelete();
        });
    }

    /**
     * Только помеченные на удаление.
     *
     * @return static
     */
    public function onlyToDelete()
    {
        return $this->filter(function (RequestEntity $request) {
            return $request->markedToDelete();
        });
    }

    /**
     * Только существующие записи, не помеченные на удаление.
     *
     * @return static
     */
    public function onlyExists()
    {
        return $this->filter(function (RequestEntity $request) {
            return $request->exists() && $request->notMarkedToDelete();
        });
    }

    /**
     * Новые записи, которых еще нет в базе.
     *
     * @return static
     */
    public function onlyNotExists()
    {
        return $this->filter(function (RequestEntity $request) {
            return $request->notExists();
        });
    }

    /**
     * Существующие записи, которые были изменены.
     *
     * @return static
     */
    public function onlyDirty()
    {
        return $this->filter(function (RequestEntity $request) {
            return $request->isDirty() && $request->exists();
        });
    }
}
