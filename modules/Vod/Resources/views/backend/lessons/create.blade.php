@extends('vod::backend.layouts.master')

@section('content')
    <div class="layui-card">
        <div class="layui-card-header">新增</div>
        <div class="layui-card-body">
            {{ form()->open(['route'=>['vod.lessons.store', 'course_id' => request('course_id')], 'method'=>'post', 'class'=>'layui-form ']) }}


                <div class="layui-row layui-col-space10">
                    @include('vod::backend.lessons.fields')
                </div>

            {{ form()->close() }}
        </div>
    </div>
@endsection
