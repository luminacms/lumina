@extends('core::layouts.modal')

@section('content')


<div class="layui-form" style="width: 300px;">
    <x-region name="province" />
</div>



<script>
    layui.use('form', function(){

    })
</script>


@endsection


