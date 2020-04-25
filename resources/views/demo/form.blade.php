@extends('core::layouts.master')

@section('content')

<script>
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.get('/interface/core/notification', function(res){
        console.log(res);
    });
</script>
<div class="layui-tab">
    <ul class="layui-tab-title">
        <li class="layui-this">基本表单</li>
        <li>选择器</li>
        <li>上传</li>
    </ul>
    <div class="layui-tab-content">

        <div class="layui-tab-item layui-show layui-form">

            <x-formItem label="input">
                <x-input name="username" verify="required" />
            </x-formItem>

            <x-formItem label="date" inline>
                <x-input.date name="date" verify="required" />
                <span class="ml-6">你好呀</span>
                <x-input.date name="date" type="datetime" verify="required" />
            </x-formItem>

            <x-formItem label="daterange">
                <x-input.dateRange name="start_at,end_at" verify="required" min="0" />
            </x-formItem>

            <x-input.rate name="rate" verify="required" />
            <x-input.select name="rate" :options="['苹果','橘子']"  value="module"/>
            <x-input.radio name="rate" :options="['苹果','橘子']"  value="module"/>
            <x-input.checkbox name="rate" :options="['苹果','橘子']"  value="module"/>

            <x-input.imgs name="rate" verify="required" />
            <x-input.file name="rate" verify="required" />
            <x-input.media name="rate" verify="required" />

            <x-input.editor name="rate" verify="required" />
            <x-input.meditor name="rate" verify="required" />

        </div>
        <div class="layui-tab-item">

        </div>
        <div class="layui-tab-item">
            {{-- <div class="layui-form-item layui-form-text">
                {!! form()->label("单图", null, ["class"=>"layui-form-label"]) !!}
                <div class="layui-input-block pt-2">
                    {!! form()->img("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
                </div>
            </div>

            <div class="layui-form-item layui-form-text">
                {!! form()->label("多图", null, ["class"=>"layui-form-label"]) !!}
                <div class="layui-input-block">
                    {!! form()->imgs("title", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
                </div>
            </div>
            <div class="layui-form layui-form-pane">
                <div class="layui-form-item">
                    {!! form()->label("视频上传", null, ["class"=>"layui-form-label"]) !!}
                    <div class="layui-input-block">
                        {!! form()->media("file", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
                    </div>
                </div>
                <div class="layui-form-item">
                    {!! form()->label("文件上传", null, ["class"=>"layui-form-label"]) !!}
                    <div class="layui-input-block">
                        {!! form()->file("file", null, ["class"=>"layui-input","lay-verify"=>"required"]) !!}
                    </div>
                </div>
            </div> --}}
        </div>
    </div>
</div>




<script>
    layui.use(['form', 'element'])

</script>

@endsection
