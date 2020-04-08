<?php

namespace Modules\Vote\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasOrder;

/**
 * Class VoteSubject.
 *
 * @package namespace Modules\Vote\Models;
 */
class VoteSubject extends BaseModel
{
    use HasOrder;

    const TYPE_RADIO = 'radio';
    const TYPE_CHECKBOX = 'checkbox';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = 'vote__subjects';
    protected $fillable = ['title', 'score', 'type', 'vote_id', 'subject_id', 'tip', 'right_option', 'important', 'sort', 'required'];

    public function options()
    {
        return $this->hasMany('Modules\Vote\Models\VoteOption', 'subject_id', 'id');
    }

}
