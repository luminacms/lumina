<?php

namespace Modules\ApiTest\Repositories;

use Modules\ApiTest\Collections\RouteCollection;
use Modules\ApiTest\Contracts\RouteRepositoryInterface;

/**
 * Class RouteRepository
 *
 * @package \Modules\ApiTest\Repositories
 */
class RouteRepository implements RouteRepositoryInterface
{
    /**
     * @type \Modules\ApiTest\Contracts\RouteRepositoryInterface[]
     */
    protected $repositories;

    /**
     * @type \Modules\ApiTest\Collections\RouteCollection
     */
    protected $routes;

    public function __construct(RouteCollection $routes, $repositories)
    {
        $this->routes = $routes;
        $this->repositories = $repositories;
    }

    /**
     * @param array $match
     * @param array $except
     *
     * @return mixed
     */
    public function get($match = [], $except = [])
    {
        foreach ($this->repositories as $repository) {

            foreach ($repository->get($match, $except) as $route) {
                $this->routes->push($route);
            }
        }

        return $this->routes;
    }
}
