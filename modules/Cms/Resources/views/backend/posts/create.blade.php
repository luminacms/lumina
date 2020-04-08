@extends('cms::backend.layouts.master')

@section('content')
    <div class="layui-card">
        <div class="layui-card-header">新增</div>
        <div class="layui-card-body">
            {{ form()->open(['route'=>'backend.cms.posts.store', 'method'=>'post', 'class'=>'layui-form ']) }}


                <div class="layui-row layui-col-space10">
                    @include('cms::backend.posts.fields')
                </div>

            {{ form()->close() }}
        </div>
    </div>
@endsection
