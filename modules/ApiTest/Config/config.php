<?php

return [

    'name' => 'ApiTest',
    /*
    |--------------------------------------------------------------------------
    | Enable api tester
    |--------------------------------------------------------------------------
    |
    | You can turn on and off the tester on will. Or maybe bind it to
    | some env value.
    |
    */

    'enabled' => env('APP_DEBUG', false),


    /*
    |--------------------------------------------------------------------------
    | Default route
    |--------------------------------------------------------------------------
    |
    | Define the route for api router.
    | http://your-site.com/{route}
    |
    */

    'route' => 'apitest',


    /*
    |--------------------------------------------------------------------------
    | Middleware
    |--------------------------------------------------------------------------
    |
    | Define list of middleware, that should be used for apitest.
    | This allows automatic CRSF token handling.
    | You can also use middleware groups, such as 'web' (Laravel 5.2+).
    |
    */

    'middleware' => [
        Illuminate\Cookie\Middleware\EncryptCookies::class,
        Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        Illuminate\Session\Middleware\StartSession::class,
        Illuminate\View\Middleware\ShareErrorsFromSession::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Additional route meta information
    |--------------------------------------------------------------------------
    | Displays additional route information. Such as request rules and comments.
    |
    | !WARNING!
    | This sometimes causes fatal errors, rendering api tester unusable.
    | Set to false if that's your case.
    */

    'route_meta' => true,


    /*
    |--------------------------------------------------------------------------
    | Request analysis
    |--------------------------------------------------------------------------
    | Display request rules..
    |
    | !WARNING!
    | This sometimes causes fatal errors, rendering api tester unusable.
    | Set to false if that's your case.
    */

    'request_rules' => true,

    /*
    |--------------------------------------------------------------------------
    | Filter routes
    |--------------------------------------------------------------------------
    | All your routes will be filtered via given patterns. Both include and
    | exclude are always applied. You can also use regex when needed.
    |
    | ## Examples
    |
    | ### Include all
    | 'include' => []
    |
    | ### Include some routes
    | 'include' => [
    |      'api/users',
    |      'api/sales',
    |      // ...
    |  ]
    |
    | ### Include/exclude advanced syntax
    | 'include' => [
    |      [
    |         'path' => 'api/v(1|2|3)/.*',
    |         'name' => '.*',
    |         'method' => '(GET|POST|PUT|PATCH|DELETE)'
    |      ],
    |      // ...
    |  ]
    |
    | ### Include all except 'api/users'
    | 'include' => [],
    | 'exclude' => ['api/users'],
    |
    */

    'include' => ['api/*', 'interface/*'],
    'exclude' => [
        'apitest',
        'telescope/*'
    ],

    /*
    |--------------------------------------------------------------------------
    | Repositories
    |--------------------------------------------------------------------------
    |
    | Specify list of Route Repositories that to be used for providing routes.
    |
    */

    'route_repositories' => [
        Modules\ApiTest\Repositories\RouteLaravelRepository::class,
        //Modules\ApiTest\Repositories\RouteDingoRepository::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Request Repository
    |--------------------------------------------------------------------------
    | Define class of request repository.
    |
    */

    'request_repository' => Modules\ApiTest\Repositories\RequestRepository::class,

    /*
    |--------------------------------------------------------------------------
    | Modules\ApiTest\Repositories\RequestRepository configuration
    |--------------------------------------------------------------------------
    | This config matters only when using Modules\ApiTest\Repositories\RequestRepository
    | or similar implementations.
    |
    */

    'storage_driver' => 'file',

    'storage_drivers' => [
        'file' => [
            'class' => Modules\ApiTest\Storages\JsonStorage::class,
            'options' => [
                'path' => 'storage/apitest/requests.db'
            ]
        ],
        'firebase' => [
            'class' => Modules\ApiTest\Storages\FireBaseStorage::class,
            'options' => [
                'base' => env('API_TESTER_FIREBASE_ADDRESS', 'https://example.firebaseio.com/apitest/'),
            ],
            'token' => [
                'secret' => env('API_TESTER_FIREBASE_SECRET', '<your-secret-api-key>'),
                'options' => ['admin' => true],
                'data' => [],
            ]
        ]
    ]
];
