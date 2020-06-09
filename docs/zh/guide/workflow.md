# 工作流/状态机

> lumina状态机管理使用symfony/workflow组件
[更多文档](http://www.symfonychina.com/doc/current/components/workflow.html)

## 使用

```php

$order = new Post();
$workflow = app('workflow')->get($order);

// 切换状态
$workflow->apply($order, 'to_review', ['name' => 'jory']);
// 检查状态权限
$workflow->can($order, 'publish');
// 查看可切换的状态
$workflow->getEnabledTransitions($order);

```

## 示例配置
```php

<?php

use Modules\Shop\Models\Order;

return [
    'shop_order' => [
        'type' => 'state_machine',
        'marking_store' => [
            'type' => 'method',
            'property' => 'currentStatus',
        ],
        'supports' => ['Modules\Shop\Models\Order'],
        'initial_marking' => Order::STATUS_NOPAY,
        'places' => [
            Order::STATUS_NOPAY,
            Order::STATUS_CONFIRMED,
            Order::STATUS_CANCEL,
            Order::STATUS_SHIPPING,
            Order::STATUS_FINISHED,
        ],
        'transitions' => [
            // 确认订单：（在线支付已支付、货到付款商家确认订单）
            'to_confirm'=> [
                'from' => Order::STATUS_NOPAY,
                'to' => Order::STATUS_CONFIRMED,
            ],
            // 已发货，填物流之后更新状态
            'to_shipping'=> [
                'from' => Order::STATUS_CONFIRMED,
                'to' => Order::STATUS_SHIPPING,
            ],
            // 已取消（1.用户未支付并取消订单2.或超时未支付后系统自动取消订单3.或货到付款订单用户拒收）
            'to_cancel'=> [
                'from' => [Order::STATUS_NOPAY, Order::STATUS_SHIPPING],
                'to' => Order::STATUS_CANCEL,
            ],
            // 完成订单，订单已签收
            'to_done'=> [
                'from' => Order::STATUS_SHIPPING,
                'to' => Order::STATUS_FINISHED,
            ]
        ],
    ]
];



```
