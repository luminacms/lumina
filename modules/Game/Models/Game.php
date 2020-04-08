<?php

namespace Modules\Game\Models;

use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Core\Traits\HasCount;
use Modules\Core\Traits\HasOrg;

/**
 * Class CaseModel.
 *
 * @package namespace App\Models;
 */
class Game extends BaseModel
{
    use softDeletes, HasCreateBy, HasCount, HasOrg;

    CONST OAUTH_DEFAULT = 'default';
    const OAUTH_WECHAT = 'wechat';
    const OAUTH_MOBILE = 'mobile';

    protected $table = 'game__games';
    public $hashConnect = 'game';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'create_by', 'status', 'img_share', 'oauth', 'group_name', 'cover',
    'share_pic','start_at','end_at','oid','mode','content','content_draft','diy_content','diy_content_draft','count'];
    public $timestamps = ['start_at', 'end_at'];

    public function pages()
    {
        return $this->hasMany('Modules\Game\Models\GamePage', 'game_id', 'id');
    }

    /**
     * @param $filename
     * @return string
     */
    public function localfile($filename)
    {
        $case_path = '/'.$this->year.'/'.$this->month.'/'.$this->id;
        return asset(config('game.game_uri') . $case_path .'/'.$filename);
    }

    /**
     * @param $query
     * @return mixed
     */
    public function scopeUndev($query)
    {
        return $query->where('status', '<', 50);
    }

    public function getPath()
    {
        $case_path = '/'.$this->year.'/'.$this->month.'/'.$this->id.'/';
        $_gamePath = config('game.game_path') . $case_path;
        return $_gamePath;
    }
}
