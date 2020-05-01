@extends('core::layouts.column_left')

@section('leftside')
    <div class="layui-tab" lay-filter="user_tab">
        <ul class="layui-tab-title">
            <li class="layui-this">部门</li>
            <li>角色</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show"><div id="depart_tree"></div></div>
            <div class="layui-tab-item"><div id="role_tree"></div></div>
        </div>
    </div>
@stop

@section('content')
    <x-submenu :items="
        [
            ['name' => '全部人员', 'uri'=>'javascript:;', 'on'=>true]
       ]" />
    <div id="depart_user">
        <table  id="user_depart_table" lay-filter="user_depart_table"></table>
    </div>
    <div id="role_user" style="display: none;">
        <table  id="user_role_table" lay-filter="user_role_table"></table>
    </div>
@endsection


@push('script')
    <script type="text/html" id="ticket_process">
        <div class="layui-progress" lay-showPercent="yes">
            <div class="layui-progress-bar layui-bg-red" lay-percent="10%"></div>
        </div>
    </script>

    <script>
        layui.use(['table', 'element', 'jstree', 'pickerUser', 'admin'], function(){
            var table = layui.table,
                admin = parent.layui == layui?layui.admin:parent.layui.admin,
                jstree = layui.jstree,
                pickerUser = layui.pickerUser,
                element = layui.element;

            var currentUrl = '{!! URL::full() !!}',
                $department_tree = $("#depart_tree"),
                $role_tree = $("#role_tree"),
                depart_id = 0,
                $title = $("#J_subtitle").find("li.layui-this > a")
                role_id = '';

            table.render({
                elem: '#user_depart_table',
                url: '{!! URL::full() !!}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                autoShow: '{{ route('core.users.show', '_id_') }}',
                page: true,
                canSearch: true,
                toolbar: {!! Auth::user()->can('admin', \Modules\Core\Models\User::class)?'"default"':'[]' !!},
                height: 'full-100',
                export: {url: '{{ url('/interface/core/users/export') }}', can: true, all: true},
                cols: [
                    [
                        {"type":"checkbox",width:80,"fixed":"left"},
                        {"field":"id","title":"ID",width:80,"fixed":"left"},
                        {"field":"name","title":"name",width: 250},
                        {"field":"mobile","title":"电话",width: 250},
                        {"field":"email","title":"email"},
                        {"field":"updated_at","title":"更新时间",width:160}
                    ]
                ]
            });


            //监听行工具事件
            table.on('toolbar(user_depart_table)', function(obj){
                var checked = table.checkStatus('user_depart_table');

                if(obj.event == 'create') {
                    admin.openModal('{{ route('core.users.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete'|| obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            admin.request.post('{{ route('core.users.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('user_depart_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        admin.openModal('{{route('core.users.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '更新数据')
                        return true;
                    }
                }
            });

            // 部门树
            $department_tree.jstree({
                core: {data: @json(\Modules\Core\Models\Department::getTree(2, 'users', true))}
            }).on('changed.jstree', function (e, data) {
                if(data && data.selected && data.selected.length) {
                    var _depart_id = data.node.parent=='#'?'':data.selected[0];

                    $title.text(data.node.text)
                    table.reload("user_depart_table", {
                        url: currentUrl,
                        where: {'depart_id': _depart_id},
                        page: {curr: 1}
                    })
                }
            });

            // 角色树
            table.render({
                elem: '#user_role_table',
                url: '{!! URL::full() !!}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc', 'role_id': '-1'},
                page: true,
                canSearch: true,
                height: 'full-100',
                toolbar: ['create', 'delete'],
                cols: [
                    [
                        {"type":"checkbox",width:80,"fixed":"left"},
                        {"field":"id","title":"ID",width:80,"fixed":"left"},
                        {"field":"name","title":"name",width: 350},
                        {"field":"mobile","title":"电话",width: 350},
                        {"field":"email","title":"email"},
                        {"field":"updated_at","title":"更新时间",width:160,off:false}
                    ]
                ]
            });
            $role_tree.jstree({
                core: {
                    data: @json(\Modules\Core\Models\Role::getTree(1, 'web'))
                }
            }).on('changed.jstree', function (e, data) {
                if(data && data.selected && data.selected.length) {
                    role_id = data.selected[0]
                    $title.text(data.node.text)
                    table.reload("user_role_table", {
                        url: currentUrl,
                        where: {role_id: role_id},
                        page: {curr: 1}
                    })
                }
            });
            table.on('toolbar(user_role_table)', function(obj){
                var checkStatus = table.checkStatus(obj.config.id);
                switch(obj.event){
                    case 'delete':
                        var data = checkStatus.data;
                        if(data.length < 1) {
                            layer.msg('请选择数据');
                        }
                        var ids = data.map(function (item) {
                            return item.id;
                        });
                        admin.request.post('{{ url('/interface/core/roles/detach') }}', {'role_id': role_id, 'userids': ids.join(',')}, function(res){
                            table.reload("user_role_table")
                        })

                        break;
                    case 'create':
                        if(role_id == '') {
                            layer.msg('请选择角色');
                            return;
                        }
                        pickerUser.render({
                            done: function(res, $el) {
                                layer.close($el)
                                var ids = res.map(function (item) {
                                    return item.id;
                                });
                                admin.request.post('{{ url('/interface/core/roles/attach') }}', {'role_id': role_id, 'userids': ids.join(',')}, function(res){
                                    table.reload("user_role_table")
                                })
                            }
                        })
                        // layer.msg(checkStatus.isAll ? '全选': '未全选');
                        break;
                };
            });

            // tab
            element.on('tab(user_tab)', function(data){
                if(data.index == 0) {
                    $("#role_user").hide()
                    $("#depart_user").show();
                    $title.text('全部人员')
                }else{
                    $("#depart_user").hide()
                    $("#role_user").show()
                }
            });
        });
    </script>
@endpush
