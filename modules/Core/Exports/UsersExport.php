<?php

namespace Modules\Core\Exports;

use Modules\Core\Models\User;

//$field = [
//    'userid' => 'USERID',
//    'name' => '姓名',
//    'mobile' => '电话',
//];
//$with = [
//    'uinfo' => [
//        'idcard' => '身份证号'
//    ],
//    'departments' => [
//        'name' => '部门'
//    ],
//
//];

class UsersExport extends BaseExport
{
    public $ids = [];
    public function __construct($ids = '', array $map, array $fields, array $with = [])
    {
        $this->fields = $fields;
        $this->with = $with;
        $this->map = collect($map);
        $this->ids = $ids!=='all'?explode(',', $ids):'';

        $_head = [];
        if(count($this->fields)>0) {
            $_head = array_merge($_head, array_values($this->fields));
        }
        if(count($this->with) > 0) {
            foreach ($this->with as $rel=>$__with) {
                $_head = array_merge($_head, array_values($__with));
            }
        }
        $this->head = $_head;
    }

    public function headings(): array
    {
        return $this->head;
    }

    public function map($row): array
    {
        $_colums = [];
        foreach($this->fields as $key=>$field) {
            $_val = '';
            if(is_array($row->$key)) {
                foreach ($row->$key as $_k=>$_v) {
                    $_val .= $_k.':'.$_v.';';
                }
            }else{
                $_val = $row->$key;
            }
            $_colums[] = $_val;
        }
        foreach ($this->with as  $k=>$rel) {
            foreach ($rel as $kcol=>$col) {
                $_arr = $row->$k->toArray();
                if(isset($_arr[0])) {
                    // 一对多关联
                    $_colums[] = $_arr[0][$kcol];
                }else{
                    $_colums[] = $_arr[$kcol];
                }
            }
        }
        return $_colums;
    }

    public function query()
    {
        $model = User::query();
        if($this->ids) {
            $model->whereIn('id', $this->ids);
        }
        return $model;
    }
}
