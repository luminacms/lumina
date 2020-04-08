@extends('layouts.modal')

@section('content')
    <form action="{{ route('wechat.msg.store') }}" method="post">
        {{ csrf_field() }}

        <div class="form-group">
            <label for="content">规则名称：</label>
            <input type="text" name="title" class="form-control">
        </div>

        <table class="table table-bordered">
            <thead>
            <tr>
                <th colspan="2">关键词管理：<a href="javascript:;" class="pull-right btn btn-primary btn-sm j_add_key">添加</a></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td id="msg_key_copy">
                    <div class="form-group form-inline">
                        <select name="key[0][type]" id="key_type" class="form-control">
                            <option value="LIKE">半匹配</option>
                            <option value="MATCH">全匹配</option>
                        </select>
                        <input type="text" name="key[0][value]" value="" class="form-control">
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        @include('wechat::msgs._'.strtolower(request('msg_type')))

        <div class="form-group form-inline">
            <label for="content">回复方式：</label>

            <label for="reply_type_all"><input type="radio" name="reply_type" value="ALL" id="reply_type_all" checked>回复全部</label>
            <label for="reply_type_random"><input type="radio" name="reply_type" value="RANDOM" id="reply_type_random">随机回复一条</label>
        </div>

        <input type="hidden" name="type" value="{{ request('type') }}">
        <input type="hidden" name="msg_type" value="{{ request('msg_type') }}">
        <input type="hidden" name="appid" value="{{  }}">

        <div class="u-btns">
            <input type="submit" value="提交" class="J_ajax_post btn btn-primary">
            <a href="javascript:;" data-dismiss="modal" class="btn btn-link">取消</a>
        </div>
    </form>

    <script>
        $(function(){
            var $key_wrap = $("#msg_key_copy")

            $(".j_add_key").click(function(){
                var _idx = $key_wrap.find(".form-group").length
                var _html = '<div class="form-group form-inline">'+
                    '       <select name="key['+_idx+'][type]" id="key_type" class="form-control">'+
                    '           <option value="LIKE">半匹配</option>'+
                    '           <option value="MATCH">全匹配</option>'+
                    '       </select>'+
                    '       <input type="text" name="key['+_idx+'][value]" value="" class="form-control">'+
                    '       <a href="javascript:;" onClick="$(this).parents(\'.form-group\').remove()" class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></a>'
                '</div>';
                $key_wrap.append(_html)
            })
        })
    </script>
@endsection
