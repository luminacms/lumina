<?php

namespace Modules\Core\Models;


use Modules\Core\Traits\HasCreateBy;
use Modules\Core\Traits\HasOrg;

/**
 * Class File.
 *
 * @package namespace Modules\Core\Models;
 */
class File extends BaseModel
{
    use HasCreateBy;

    public $table = 'core_files';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['md5','path','create_by','ext','size','disk','oid'];

}
