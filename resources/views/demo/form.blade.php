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


            <x-formItem inline>
                
            </x-formItem>

            <div class="layui-form-item">

                <div class="layui-inline">
                  <label class="layui-form-label">范围</label>
                  <div class="layui-input-inline" style="width: 100px;">
                    <input type="text" name="price_min" placeholder="￥" autocomplete="off" class="layui-input">
                  </div>
                  <div class="layui-form-mid">-</div>
                  <div class="layui-input-inline" style="width: 100px;">
                    <input type="text" name="price_max" placeholder="￥" autocomplete="off" class="layui-input">
                  </div>
                </div>

                <div class="layui-inline">
                  <label class="layui-form-label">密码</label>
                  <div class="layui-input-inline" style="width: 100px;">
                    <input type="password" name="" autocomplete="off" class="layui-input">
                  </div>
                </div>

              </div>


            <x-formItem label="input">
                <x-input name="username" verify="required" />
            </x-formItem>

            <x-formItem label="date" inline>
                <span class="ml-6">date</span>
                <x-input.date name="date" verify="required" />
                <span class="ml-6">datetime</span>
                <x-input.date name="date" type="datetime" verify="required" />
                <span class="ml-6">time</span>
                <x-input.date name="date" type="time" verify="required" />
            </x-formItem>

            <x-formItem label="daterange">
                <x-input.dateRange name="start_at,end_at" verify="required" min="0" value="2018-12-1,2019-11-5"/>
            </x-formItem>

            <x-formItem label="daterange">
                <x-input.dateRange name="start_at,end_at" type="datetime" verify="required" min="0" />
            </x-formItem>
            <x-formItem label="daterange">
                <x-input.dateRange name="start_at,end_at" type="time" verify="required" min="0" />
            </x-formItem>

            <x-input.rate name="rate" verify="required" />
            <x-input.select name="rate" :options="['苹果','橘子']"  value="module"/>
            <x-input.radio name="rate" :options="['苹果','橘子']"  value="module"/>
            <x-input.checkbox name="rate" :options="['苹果','橘子']"  value="module"/>

            <x-formItem label="上传">
                <x-input.imgs name="rate" verify="required" />
            </x-formItem>
            <x-formItem label="多图上传">
                <x-input.imgs name="rate" verify="required" limit="4"/>
            </x-formItem>

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
