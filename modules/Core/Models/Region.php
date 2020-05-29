<?php

namespace Modules\Core\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Core\Traits\HasPathTree;

class Region extends BaseModel
{

    use HasPathTree;

    public $table = 'core_regions';
    protected $fillable = [];


}
