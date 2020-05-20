@extends('core::layouts.modal')

@section('content')


<div class="layui-form">
    <form action="">
        <div id="elem"></div>
    </form>
</div>



<script>

layui.extend({
    'city': 'extends/city'
}).use(['element', 'city'], function(){
    var city = layui.city;

    city.render({
        elem: '#elem'
    })


})
</script>

@endsection
