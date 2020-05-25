<?php

use Modules\Shop\Models\Order;

return [
    'post'   => [
        'type' => 'state_machine',
        'marking_store' => [
            'type' => 'method',
            'property' => 'currentStatus',
        ],
        'supports' => ['Modules\Shop\Models\Order'],
        'initial_marking' => 'draft',
        'places' => [
            Order::STATUS_NOPAY,
            Order::STATUS_CONFIRMED,
            Order::STATUS_CANCEL,
            Order::STATUS_SHIPPING,
            Order::STATUS_FINISHED,
        ],
        'transitions' => [
            'to_review'=> [
                'from' => Order::STATUS_NOPAY,
                'to' => Order::STATUS_CONFIRMED,
            ],
            'publish'=> [
                'from' => Order::STATUS_CONFIRMED,
                'to' => Order::STATUS_FINISHED,
            ]
        ],
    ]
];
