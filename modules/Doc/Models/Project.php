<?php

namespace Modules\Doc\Models;

use Cache;
use Carbon\Carbon;
use DB;
use Modules\Core\Traits\HasCreateBy;
use Modules\Doc\Exceptions\DataNullException;
use Modules\Doc\Exceptions\FormatException;
use Modules\Doc\Exceptions\ResultException;

/**
 * Modules\Doc\Models\Project
 *
 * @property integer $project_id
 * @property string $project_name 项目名称
 * @property string $description 项目描述
 * @property boolean $project_open_state 项目公开状态：0 私密，1 完全公开，3 加密公开
 * @property string $project_password 项目密码
 * @property string $created_at
 * @property integer $create_by
 * @property string $updated_at
 * @property integer $modify_by
 * @property string $version 当前时间戳
 * @method static \Illuminate\Database\Query\Builder|Project whereProjectId($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereProjectName($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereDescription($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereProjectOpenState($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereProjectPassword($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereCreateTime($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereCreateAt($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereModifyTime($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereModifyAt($value)
 * @method static \Illuminate\Database\Query\Builder|Project whereVersion($value)
 * @mixin \Eloquent
 * @property integer $doc_count 文档数据量
 * @method static \Illuminate\Database\Query\Builder|Project whereDocCount($value)
 * @property string $doc_tree 当前项目的文档树
 * @method static \Illuminate\Database\Query\Builder|Project whereDocTree($value)
 */
class Project extends ModelBase
{
    use HasCreateBy;

    protected $table = 'doc__project';
    protected $dateFormat = 'Y-m-d H:i:s';
    protected $guarded = ['project_id'];

    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function documents()
    {
        return $this->hasMany('Modules\Doc\Models\Document', 'project_id', 'id');
    }

    /**
     * 删除项目以及项目相关的文档
     * @param $project_id
     * @return bool
     * @throws DataNullException|ResultException
     */
    public static function deleteProjectByProjectId($project_id)
    {
        $project = Project::find($project_id);
        if(empty($project)){
            throw new DataNullException('项目不存在',40206);
        }
        $docs = Document::where('project_id','=',$project_id)->select('id')->get()->toArray();
        DB::beginTransaction();
        try {
            if (empty($docs) === false) {
                Document::where('project_id', '=', $project_id)->delete();
                DocumentHistory::whereIn('id', $docs)->delete();
            }
            Relationship::where('project_id', '=', $project_id)->delete();
            $project->delete();
            DB::commit();
            return true;
        }catch (\Exception $ex){
            DB::rollBack();
            throw new ResultException($ex->getMessage(),500);
        }

    }
    /**
     * 添加或更新项目
     * @return bool
     * @throws \Exception
     */
    public function addOrUpdate()
    {
        if(empty($this->project_name) || mb_strlen($this->project_name) < 2 || mb_strlen($this->project_name) > 50){
            throw new FormatException('项目名称必须在2-50字之间',40201);
        }
        if(mb_strlen($this->description) > 1000){
            throw new FormatException('项目描述不能超过1000字',40202);
        }

        if(in_array($this->project_open_state,['0','1','2']) === false){
            throw new FormatException('项目公开状态错误',40204);
        }

        if($this->project_open_state == 2 and (strlen($this->project_password) < 6 or strlen($this->project_password) > 20)){
            throw new FormatException('项目密码必须在6-20字之间',40203);
        }

        if($this->project_open_state != 2){
            $this->project_password = null;
        }

        DB::beginTransaction();
//        try{
//
//            if($this->project_id <= 0){
//                $relationship = new Relationship();
//                $relationship->member_id = $this->create_by;
//                $relationship->project_id = $this->project_id;
//                $relationship->role_type = 1;
//
//            }
//            $this->save();
//
//            if(isset($relationship)){
//                $relationship->project_id = $this->project_id;
//                $relationship->save();
//            }
//
//            DB::commit();
//            return true;
//        }catch (\Exception $ex){
//            DB::rollBack();
//            throw new ResultException($ex->getMessage(),500);
//        }
    }
    /**
     * 查询可编辑的项目列表
     * @param int $member_id
     * @param int $pageIndex
     * @param int $pageSize
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public static function getParticipationProjectList($member_id, $pageIndex = 1, $pageSize = 20)
    {
//        $member = Member::find($member_id);

        //如果是超级管理员则无限制
//        if(empty($member) === false && $member->group_level === 0){
//            $query = DB::table('doc__project as pro')
//                ->select(['pro.*','rel.role_type','rel.member_id as rel_member_id','m.account','m.nickname'])
//                ->leftJoin('relationship as rel',function($join)use($member_id){
//                    $join->on('rel.project_id','=','pro.project_id')
//                        ->where('rel.member_id','=',$member_id);
//                })
//                ->orderBy('pro.project_id','DESC');
//
//
//        }else{
            $query = DB::table('doc__project as pro')
//                ->select(['pro.*','rel.role_type','rel.member_id as rel_member_id','m.account','m.nickname'])
//                ->leftJoin('relationship as rel','rel.project_id','=','pro.project_id')
                ->orderBy('pro.id','DESC');
//        }
        $query =  $query->paginate($pageSize,['*'],'page',$pageIndex);

        if($query->isEmpty() === false){
            foreach ($query as &$item){
                //$item->member_count = Relationship::where('project_id','=',$item->project_id)->count();

                $doc = Document::where('id','=',$item->id)
                    ->select(['doc__document.updated_at','doc__document.created_at'])
                    ->limit(1)->orderBy('updated_at','DESC')->first();
                if($doc) {
                    $item->last_document_time = $doc->updated_at ?: $doc->created_at;
                    $item->last_document_user = $doc->nickname?:$doc->account;
                }
            }
        }
        return $query;
    }

    /**
     * 查询可查看的项目列表
     * @param int $pageIndex
     * @param int $pageSize
     * @param null $member_id
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public static function getProjectByMemberId($pageIndex = 1, $pageSize = 20, $member_id = null)
    {
        if(empty($member_id) === false){


            $member = Member::find($member_id);
            if(empty($member) === false && $member->group_level === 0){
                return DB::table('doc__project')->select(['*']) -> orderBy('id','DESC')
                    ->paginate($pageSize,['*'],'page',$pageIndex);
            }
//            $query = DB::table('doc__project as pro')
//                ->select('pro.*')
//                ->leftJoin('relationship as rel',function($join)use($member_id){
//                    $join->on('pro.project_id','=','rel.project_id')
//                        ->where('rel.member_id','=',$member_id);
//                })
//                ->orWhere('pro.project_open_state','<>',0)
//                ->orWhere('rel_id','>',0)
//                ->orderBy('pro.project_id','DESC')
//                ->paginate($pageSize,['*'],'page',$pageIndex);


//            return $query;

        }else{
            $query = DB::table('doc__project')
                ->select('*')
                ->where('project_open_state','<>',0)
                ->orderBy('id','DESC')
                ->paginate($pageSize,['*'],'page',$pageIndex);

            return $query;
        }
    }

    /**
     * 获取指定用户是否有指定文档编辑权限
     * @param int $project_id
     * @param int $member_id
     * @return bool
     */
    public static function hasProjectEdit($project_id,$member_id)
    {
        if(empty($project_id) or empty($member_id)){
            return false;
        }
        //超级管理员不限制权限
        $member = Member::find($member_id);

        if(empty($member) === false && $member->group_level == 0){
            return true;
        }
        $project = DB::table('relationship as ship')
            ->select('pro.*')
            ->leftJoin('project as pro','ship.project_id','=','pro.project_id')
            ->where('ship.member_id','=',$member_id)
            ->where('ship.project_id','=',$project_id)
            ->first();
        return empty($project) === false;
    }

    /**
     * 判断用户是否有查看指定文档权限
     * @param $project_id
     * @param int|null $member_id
     * @param string|null $passwd
     * @return int 0 项目不存在；1 有权限； 2 需要密码； 3 没有权限
     */
    public static function hasProjectShow($project_id,$member_id = null,$passwd = null)
    {
        $project = Project::getProjectFromCache($project_id);

        if(empty($project)){
            return 0;
        }
        if($project->project_open_state == 1){
            return 1;
        }

        if ($project->project_open_state == 2) {

            if(empty($passwd)) {
                return 2;
            }elseif (strcasecmp($passwd,$project->project_password) === 0){
                return 1;
            }
        }
//        if(empty($member_id) === false) {
//            $rel = Relationship::where('project_id', '=', $project_id)
//                ->where('member_id', '=', $member_id)
//                ->first();
//            return empty($rel) ? 3 : 1;
//        }
        return 3;
    }

    /**
     * 判断制定用户是否有创建项目权限
     * @param int $member_id
     * @return bool
     */
    public static function isCanCreateProject($member_id){
        if(empty($member_id)){
            return false;
        }
        $member = Member::find($member_id);

        if(!$member || ($member->group_level != 0 && $member->group_level != 1)){
            return false;
        }
        return true;
    }
    /**
     * 获取项目的文档树
     * @param int $project_id
     * @return array
     */
    public static function getProjectArrayTree($project_id)
    {
        if(empty($project_id)){
            return [];
        }
        $tree = Document::where('project_id','=',$project_id)
            ->select(['id','title','parentid'])
            ->orderBy('sort','ASC')
            ->get();
        $jsonArray = [];

        if(empty($tree) === false){
            foreach ($tree as &$item){
                $tmp['id'] = $item ->id.'';
                $tmp['text'] = $item->title;
                $tmp['parent'] = ($item->parentid == 0 ? '#' : $item->parentid).'';

                $jsonArray[] = $tmp;
            }
        }
        return $jsonArray;
    }

    /**
     * 获取项目的文档树Html结构
     * @param int $project_id
     * @param int $selected_id
     * @return string
     */
    public static function getProjectHtmlTree($project_id,$selected_id = 0)
    {
        if(empty($project_id)){
            return '';
        }
        $tree = Document::where('project_id','=',$project_id)
            ->select(['id','title','parentid','project_id'])
            ->orderBy('sort','ASC')
            ->get()
            ->toArray();

        if(empty($tree) === false){
            $parentid = self::getSelecdNode($tree,$selected_id);

            return self::createTree(0,$tree,$selected_id,$parentid);
        }
        return '';
    }

    protected static function getSelecdNode($array,$parentid)
    {
        foreach ($array as $item){
            if($item['id'] == $parentid and $item['parentid'] == 0){
                return $item['id'];
            }elseif ($item['id'] == $parentid and $item['parentid'] != 0){
                return self::getSelecdNode($array,$item['parentid']);
            }
        }
        return 0;
    }

    protected static function createTree($parentid,array $array,$selected_id = 0,$selected_parentid = 0)
    {
        global $menu;
        $menu .= '<ul>';
        foreach ($array as $item){
            if($item['parentid'] == $parentid) {
                $selected = $item['id'] == $selected_id ? ' class="jstree-clicked"' : '';
                $selected_li = $item['id'] == $selected_parentid ? ' class="jstree-open"' : '';

                $menu .= '<li id="'.$item['id'].'"'.$selected_li.'><a href="'. route('doc.document.show',['id'=> $item['id']]) .'" title="' . htmlspecialchars($item['title']) . '"'.$selected.'>' . $item['title'] .'</a>';

                $key = array_search($item['id'], array_column($array, 'parentid'));

                if ($key !== false) {
                    self::createTree($item['id'], $array,$selected_id,$selected_parentid);
                }
                $menu .= '</li>';
            }
        }
        $menu .= '</ul>';
        return $menu;
    }

    /**
     * 获取指定项目的参与用户列表
     * @param int $project_id
     * @return array|static[]
     */
    public static function getProjectMemberByProjectId($project_id)
    {
        $query = DB::table('relationship AS rel')
            ->select(['member.member_id','rel.role_type','member.account','member.nickname','member.email','member.headimgurl'])
            ->leftJoin('member AS member','member.member_id','=','rel.member_id')
            ->where('rel.project_id','=',$project_id)
            ->orderBy('rel.rel_id','DESC')
             ->get();
        return $query;
    }

    /**
     * 判断是否是指定项目的拥有者
     * @param int $project_id
     * @param int $member_id
     * @return bool
     */
    public static function isOwner($project_id,$member_id)
    {
        $result = Relationship::where('project_id','=',$project_id)->where('member_id','=',$member_id)->first();

        return (empty($result) || $result->role_type == 0) ? false : true;
    }

    /**
     * 判断是否是指定项目的参与者
     * @param int $project_id
     * @param int $member_id
     * @return bool
     */
    public static function isPartner($project_id,$member_id)
    {
        $result = Relationship::where('project_id','=',$project_id)->where('member_id','=',$member_id)->first();

        return (empty($result) == false && $result->role_type == 0) ? true : false;
    }

    /**
     * 从缓存中获取项目信息
     * @param $project_id
     * @param bool $update
     * @return bool|Project|null
     */
    public static function getProjectFromCache($project_id,$update = false)
    {
        if(empty($project_id)){
            return false;
        }
        $key = 'project.id.' . $project_id;

        $project = $update or Cache::get($key);

        if(empty($project)) {
            $project = Project::find($project_id);
            if(empty($project)){
                return false;
            }

            $expiresAt = Carbon::now()->addHour(12);

            Cache::put($key, $project, $expiresAt);
        }
        return $project;
    }

    /**
     * 搜索项目
     * @param string $keyword 关键字
     * @param int $pageIndex
     * @param int $pageSize
     * @return bool|\Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public static function search($keyword,$pageIndex= 1, $pageSize = 20, $memberId = null)
    {
        if(empty($keyword)) {
            return false;
        }
        $keyword = '%'. preg_replace('/\s+/','%',trim($keyword)).'%';

       if(empty($memberId) === false) {

           $searchResult = DB::table('doc__project')->select(['*'])
               ->where(function ($query) use ($keyword) {
                   $query->where('project_name', 'like', $keyword)
                       ->orWhere('description', 'like', $keyword);
               })
               ->orderBy('id', 'DESC')
               ->paginate($pageSize, ['*'], 'page', $pageIndex)
               ->appends([
                   'keyword' => $keyword
               ]);

       }else {
           $searchResult = DB::table('doc__project')->select(['*'])
               ->where('project_open_state', '<>', 0)
               ->where(function ($query) use ($keyword) {
                   $query->where('project_name', 'like', $keyword)
                       ->orWhere('description', 'like', $keyword);
               })
               ->orderBy('id', 'DESC')
               ->paginate($pageSize, ['*'], 'page', $pageIndex)
               ->appends([
                   'keyword' => $keyword
               ]);
       }
        return $searchResult;
    }
}
