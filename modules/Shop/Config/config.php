<?php

return [
    'name' => 'Shop',
    'workflows' => array(
        'blog_publishing' => array(
          'type' => 'state_machine', // or 'state_machine'
          'marking_store' => array(
            'type' => 'single_state', // or 'single_state'
            'arguments' => array('currentPlace')
          ),
          'supports' => array('Modules\Shop\Models\Order'),
          'places' => array(
            'draft',
            'review',
            'rejected',
            'published',
          ),
          'transitions' => array(
            'to_review'=> array(
              'form' => 'draft',
              'to' => 'review',
            ),
            'publish'=> array(
              'form' => 'review',
              'to' => 'published',
            ),
            'reject'=> array(
              'form' => 'review',
              'to' => 'rejected',
            ),
          ),
        ),
    )
];
