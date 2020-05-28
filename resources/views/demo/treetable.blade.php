@extends('core::layouts.modal')

@section('content')

<table id="test1" lay-filter="data_category_table" class="layui-table"></table>
<script>
layui.use('treeTable', function(){
  var treeTable = layui.treeTable;

    treeTable.render({
        elem: '#test1',
        url: '{!! url("/shop/category") !!}',
        icon_field: 'name',
        is_checkbox: true,
        cols: [
            {"field":"id","title":"ID", "width":100},
            {"field":"name","title":"name"},
            {"field":"path","title":"path"},
            {"field":"level","title":"level"},
            {"field":"created_at","title":"created_at"},
            {"field":"updated_at","title":"updated_at"}
        ]
    });

});
</script>
@endsection
