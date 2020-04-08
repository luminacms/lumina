@extends('core::layouts.master')

@section('content')
    <x-submenu :items="
    [
    ['name' => '粉丝管理', 'uri' => route('core.user-socialites.index')]
   ]" />

    <table class="layui-hide" id="data_usersocialite_table" lay-filter="data_usersocialite_table"></table>
@endsection


@push('script')
    <script type="text/html" id="tpl_driver">
        @{{# if(d.driver == 'toutiao'){ }}
        <span class="layui-badge bg-red-500">头条</span>
        @{{# }else if(d.driver == 'wechat'){ }}
        <span class="layui-badge bg-green-600">微信</span>
        @{{# }else{ }}
        <span class="layui-badge bg-green-600">@{{ d.driver  }}</span>
        @{{# } }}
    </script>
    <script>
        layui.use(['table', 'element'], function(){
            var table = layui.table,
                element = layui.element;

            table.render({
                elem: '#data_usersocialite_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('core.user-socialites.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: [],
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[
                    {"type":"checkbox","fixed":"left"},
                    {"field":"user_id","title":"UserId"},
                    {"field":"driver","title":"driver",templet: '#tpl_driver'},
                    {"field":"nickname","title":"nickname",width:150},
                    {"field":"avatar","title":"avatar",templet: '<div><img src="@{{ d.avatar }}" width="30"/></div>',width:90},
                    {"field":"openid","title":"openid",width:150},
                    {"field":"anonymous_openid","title":"anonymous_openid"},
                    {"field":"token","title":"token"},
                    {"field":"gender","title":"gender"},{"field":"country","title":"country"},{"field":"province","title":"province"},{"field":"city","title":"city"},{"field":"created_at","title":"创建时间"},{"field":"updated_at","title":"更新时间","fixed":"right"}]]
            });

            //监听行工具事件
            table.on('toolbar(data_usersocialite_table)', function(obj){
                var checked = table.checkStatus('data_usersocialite_table');

                if(obj.event == 'create') {
                    parent.layui.admin.openTabsPage('{{ route('core.user-socialites.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete'|| obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.admin.request.post('{{ route('core.user-socialites.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_usersocialite_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.admin.openTabsPage('{{route('core.user-socialites.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id)
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
