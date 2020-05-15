# HasOrg

```php
<?php

namespace Modules\Core\Traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

/**
 * Class RevisionableTrait
 * @package Venturecraft\Revisionable
 */
trait HasOrg
{
    public $orgFilter = true;
    public function setOrgFilter(bool $toggle){}

    /**
     * Create the event listeners for the saving and saved events
     * This lets us save revisions whenever a save is made, no matter the
     * http method.
     *
     */
    public static function bootHasOrg() {}
}
```
