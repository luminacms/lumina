## workflow

```php

// config配置文件中
'post'   => [
    'type' => 'state_machine',
    'marking_store' => [
        'type' => 'method',
        'property' => 'currentStatus',
    ],
    'supports' => ['Modules\Shop\Models\Order'],
    'initial_marking' => 'draft',
    'places' => ['draft', 'reviewed', 'rejected', 'published'],
    'transitions' => [
        'to_review'=> [
            'from' => 'draft',
            'to' => 'reviewed',
        ],
        'publish'=> [
            'from' => 'reviewed',
            'to' => 'published',
        ],
        'reject'=> [
            'from' => ['reviewed'], // 多个原始状态可传值数组
            'to' => 'rejected',
        ]
    ]
]


// 使用

$order = new Post();
$workflow = app('workflow')->get($order);

$workflow->apply($order, 'to_review', ['name' => 'jory']);
$workflow->can($order, 'publish');
$workflow->getEnabledTransitions($order);

```


