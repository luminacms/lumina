<?php

namespace Modules\Shop\Models;

use Exception;
use Modules\Core\Traits\HasOrg;
use Illuminate\Support\Facades\DB;
use Modules\Core\Models\BaseModel;
use Modules\Core\Traits\HasCreateBy;

/**
 * Class Attribute.
 *
 * @package namespace Modules\Shop\Models;
 */
class Spec extends BaseModel
{
    use HasCreateBy, HasOrg;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $table = "shop__spec";
    protected $fillable = ['name','description','create_by','oid'];

    /**
     * The attributes that are can be search =/like.
     *
     * @var array
     */
    protected $fieldSearchable = [];

    public function vals()
    {
        return $this->hasMany('Modules\Shop\Models\SpecValue', 'spec_id', 'id');
    }

    /**
     * 创建规格
     *
     * @param [type] $specs
     * @return void
     */
    public function saveSpecValues($request)
    {
        // try{
            $res = DB::transaction(function () use($request){
                $specs = json_decode($request->get('specs'), true);
                $model = $this->firstOrCreate(['name' => $request->get('name')]);

                foreach($specs as $_spec) {
                    $parent = SpecValue::create([
                        'spec_id' => $model->id,
                        'name' => $_spec['label'],
                        'parentid' => 0
                    ]);
                    foreach($_spec['children'] as $_opt) {
                        SpecValue::create([
                            'spec_id' => $model->id,
                            'name' => $_opt['label'],
                            'parentid' => $parent->id
                        ]);
                    }
                }
                return $model;
            });
            return $res;
        // }catch(Exception $e) {
        //     abort(500, $e->getMessage());
        // }
    }

    /**
     * 获取规格值
     *
     * @return void
     */
    public function getValOptions()
    {
        $query = SpecValue::where('spec_id', $this->id)->get();
        return SpecValue::getSimpleTree($query);
    }

}
