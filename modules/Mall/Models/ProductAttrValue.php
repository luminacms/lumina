<?php

namespace Modules\Mall\Models;

use Modules\Core\Models\BaseModel;

/**
 * Class ProductAttrValue.
 *
 * @package namespace Modules\Mall\Models;
 */
class ProductAttrValue extends BaseModel
{
    protected $table = 'mall__product_attr_values';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['attr_id', 'value'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function attr()
    {
        return $this->belongsTo('Modules\Mall\Models\ProductAttr', 'attr_id', 'id');
    }

}
