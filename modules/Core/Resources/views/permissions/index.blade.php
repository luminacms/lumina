@extends('core::layouts.column_left')

@section('leftside')
    <div class="layui-card">
        <div class="layui-card-header">
            <a lay-href="{{ route('core.roles.create') }}" class="border px-4  py-1 text-sm leading-tight mt-4">添加角色</a>
            <a lay-href="{{ route('core.permission.create') }}" class="border px-4  py-1 text-sm leading-tight mt-4">添加权限</a>
        </div>
        <div class="layui-card-body">
            <h3 class="p-2 bg-gray-200 font-bold">人员角色</h3>
            <ul>
                @foreach(\Modules\Core\Models\Role::nosuper()->where('guard_name', 'web')->get() as $_role)
                    <li><a href="{{ route('core.permission.index', ['role_id' => $_role->id]) }}" class="{{ $_role['id']==$role->id?'text-red-500':'' }}">{{ $_role['label'] }}</a></li>
                @endforeach
            </ul>
            <h3 class="p-2 bg-gray-200 font-bold mt-4">运营商</h3>
            <ul>
                @foreach(\Modules\Core\Models\Role::where('guard_name', 'org')->get() as $_role)
                    <li><a href="{{ route('core.permission.index', ['role_id' => $_role->id]) }}" class="{{ $_role['id']==$role->id?'text-red-500':'' }}">{{ $_role['label'] }}</a></li>
                @endforeach
            </ul>
        </div>
    </div>

@stop

@section('content')
    <x-submenu :items="
        [
            ['name' => '列表管理', 'uri' => route('core.permission.index')]
       ]" />

    <x-card>
        <x-form :action="route('core.permission.attach')" method="post">
            <dl class="p-lg">
                @foreach(\Modules\Core\Models\Permission::where('guard_name', $role_guard)->get() as $permiss)
                    <dd class="mb-2">
                        <label for="permission_{{ $permiss['id'] }}" class="m-r-lg"></label>
                        <input type="checkbox" name="permission[]" id="permission_{{ $permiss['id'] }}"
                        value="{{ $permiss['id'] }}"
                        {{ isset($role)&&$role->checkPermissionTo($permiss['name'])?'checked':'' }}
                        data-name="{{ $permiss['name'] }}">{{ $permiss['label'] }}
                    </dd>
                @endforeach
            </dl>

            <x-formItem type="submit">
                <button class="layui-btn" lay-submit lay-filter="component-form-demo1">{{__('main.submit')}}</button>
            </x-formItem>

            <input type="hidden" name="role_id" value="{{ $role->id ?? '' }}">
        </x-form>
    </x-card>



@endsection


@push('script')
    <script>
        layui.use(['table', 'jstree'], function(){
            var table = layui.table,
                jstree = layui.jstree,
                admin = parent.layui == layui?layui.admin:parent.layui.admin,
                $department_tree = $("#depart_tree");

            table.render({
                elem: '#data_permission_table',
                url: '{{ URL::full() }}',
                autoShow: '{{ route('core.permission.show', '_id_') }}',
                where: {'orderBy': 'created_at', 'sortedBy': 'desc'},
                page: true,
                canSearch: true,
                toolbar: 'default',
                height: 'full-100',
                cellMinWidth: 80,
                cols: [[{"type":"checkbox","fixed":"left"},{"field":"id","title":"id","sort":"true","fixed":"left","width":"120"},{"field":"name","title":"name"},{"field":"guard_name","title":"guard_name"},{"field":"created_at","title":"创建时间"},{"field":"updated_at","title":"更新时间","fixed":"right"}]]
            });

            //监听行工具事件
            table.on('toolbar(data_permission_table)', function(obj){
                var checked = table.checkStatus('data_permission_table');

                if(obj.event == 'create') {
                    admin.openTab('{{ route('core.permission.create') }}', '新增数据')
                    return true;
                }

                if((obj.event == 'delete'|| obj.event == 'update') && checked.data.length >0 ) {
                    if(checked.data.length !== 1) {
                        layer.msg('请选择一条数据!');
                        return false;
                    }

                    if(obj.event === 'delete') {
                        layer.confirm('真的删除行么', function(index){
                            parent.layui.lumina.request.post('{{ route('core.permission.destroy', '_id_') }}'.replace('_id_', checked.data[0].id), {'_method': 'DELETE'}, function(res){
                                layer.msg('删除成功');
                                table.reload('data_permission_table')
                            })

                            layer.close(index);
                        });
                    }else if(obj.event === 'update') {
                        parent.layui.lumina.openTab('{{route('core.permission.edit', '_id_')}}'.replace('_id_', checked.data[0].id), '修改数据#'+checked.data[0].id)
                        return true;
                    }
                }
            });

        });
    </script>
@endpush
