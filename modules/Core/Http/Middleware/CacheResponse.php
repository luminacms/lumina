<?php

namespace Modules\Core\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Spatie\ResponseCache\ResponseCache;
use Spatie\ResponseCache\Events\CacheMissed;
use Spatie\ResponseCache\Replacers\Replacer;
use Symfony\Component\HttpFoundation\Response;
use Spatie\ResponseCache\Events\ResponseCacheHit;

class CacheResponse
{
    /** @var \Spatie\ResponseCache\ResponseCache */
    protected $responseCache;

    public function __construct(ResponseCache $responseCache)
    {
        $this->responseCache = $responseCache;
    }

    public function handle(Request $request, Closure $next, ...$args): Response
    {
        if(app()->isLocal()) {
            return $next($request);
        }
        $lifetimeInSeconds = $this->getLifetime($args);
        $tags = $this->getTags($args);

        if ($this->responseCache->enabled($request)) {
            if ($this->responseCache->hasBeenCached($request, $tags)) {
                event(new ResponseCacheHit($request));

                $response = $this->responseCache->getCachedResponseFor($request, $tags);

                $this->getReplacers()->each(function (Replacer $replacer) use ($response) {
                    $replacer->replaceInCachedResponse($response);
                });

                return $response;
            }
        }

        $response = $next($request);

        if ($this->responseCache->enabled($request)) {
            if ($this->responseCache->shouldCache($request, $response)) {
                $this->makeReplacementsAndCacheResponse($request, $response, $lifetimeInSeconds, $tags);
            }
        }

        event(new CacheMissed($request));

        return $response;
    }

    protected function makeReplacementsAndCacheResponse(
        Request $request,
        Response $response,
        ?int $lifetimeInSeconds = null,
        array $tags = []
    ): void {
        $cachedResponse = clone $response;

        $this->getReplacers()->each(function (Replacer $replacer) use ($cachedResponse) {
            $replacer->prepareResponseToCache($cachedResponse);
        });

        $this->responseCache->cacheResponse($request, $cachedResponse, $lifetimeInSeconds, $tags);
    }

    protected function getReplacers(): Collection
    {
        return collect(config('responsecache.replacers'))
            ->map(function (string $replacerClass) {
                return app($replacerClass);
            });
    }

    protected function getLifetime(array $args): ?int
    {
        if (count($args) >= 1 && is_numeric($args[0])) {
            return (int) $args[0];
        }

        return null;
    }

    protected function getTags(array $args): array
    {
        $tags = $args;

        if (count($args) >= 1 && is_numeric($args[0])) {
            $tags = array_slice($args, 1);
        }

        return array_filter($tags);
    }
}
