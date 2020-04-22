@extends('core::layouts.master')

@section('content')

<div class="layui-tab-item layui-show layui-form" lay-filter="xform">
<x-input.imgs name="rate" verify="required" />

<x-input.imgs name="aa" verify="required" />

</div>

<script>
    // layui.use(['form', 'element'], function(){

    //     var form = layui.form;

    //     form.on('img(xform)', function(e) {
    //         console.log(e)
    //     })
    // })

</script>

@endsection
